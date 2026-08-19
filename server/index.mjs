import crypto from "node:crypto";
import express from "express";
import pg from "pg";

const { Pool } = pg;
const app = express();
const pool = new Pool({ connectionString: required("DATABASE_URL") });
const monitorToken = required("VOXELLINK_MONITOR_TOKEN");
const discordClientId = required("DISCORD_CLIENT_ID");
const discordClientSecret = required("DISCORD_CLIENT_SECRET");
const publicBaseUrl = required("PUBLIC_BASE_URL").replace(/\/$/, "");
const sessionSecret = required("SESSION_SECRET");
const monitorImport = monitorImportConfig();
const oauthStates = new Map();
let flushingMonitorImports = false;
app.use(express.json({ limit: "64kb" }));
if (monitorImport) {
  void flushMonitorImports();
  setInterval(() => void flushMonitorImports(), 30_000).unref();
} else {
  console.warn(
    "Monitor import delivery is disabled; configure both VOXELLINK_MONITOR_IMPORT_* variables",
  );
}

app.get("/healthz", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.sendStatus(204);
  } catch {
    response.sendStatus(503);
  }
});

app.get("/auth/discord/login", (_request, response) => {
  const state = crypto.randomBytes(24).toString("base64url");
  oauthStates.set(state, Date.now() + 10 * 60 * 1000);
  response.redirect(
    `https://discord.com/oauth2/authorize?${new URLSearchParams({ client_id: discordClientId, redirect_uri: `${publicBaseUrl}/auth/discord/callback`, response_type: "code", scope: "identify", state })}`,
  );
});

app.get("/auth/discord/callback", async (request, response, next) => {
  try {
    const code =
      typeof request.query.code === "string" ? request.query.code : "";
    const state =
      typeof request.query.state === "string" ? request.query.state : "";
    const expiresAt = oauthStates.get(state);
    oauthStates.delete(state);
    if (!code || !expiresAt || expiresAt < Date.now())
      return response.redirect("/console?error=oauth");
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: discordClientId,
        client_secret: discordClientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: `${publicBaseUrl}/auth/discord/callback`,
      }),
    });
    if (!tokenResponse.ok) {
      console.warn("Discord OAuth token exchange rejected", {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
      });
      return response.redirect("/console?error=oauth");
    }
    const token = await tokenResponse.json();
    if (typeof token.access_token !== "string") {
      console.warn("Discord OAuth token response had no access token");
      return response.redirect("/console?error=oauth");
    }
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { authorization: `Bearer ${token.access_token}` },
    });
    if (!userResponse.ok) {
      console.warn("Discord OAuth user lookup rejected", {
        status: userResponse.status,
        statusText: userResponse.statusText,
      });
      return response.redirect("/console?error=oauth");
    }
    const user = await userResponse.json();
    if (!user.id || typeof user.id !== "string")
      return response.redirect("/console?error=oauth");
    setSession(response, {
      id: user.id,
      username: user.global_name || user.username || "Discord user",
    });
    return response.redirect("/console");
  } catch (error) {
    return next(error);
  }
});

app.post("/auth/logout", (_request, response) => {
  response.clearCookie("voxellink_session", {
    httpOnly: true,
    sameSite: "lax",
    secure: publicBaseUrl.startsWith("https://"),
    path: "/",
  });
  response.sendStatus(204);
});

app.get(
  "/api/v1/public/servers/:slug/rules",
  async (request, response, next) => {
    try {
      const listing = await pool.query(
        "SELECT name, hostname, port, description, rules_content, official_rules_url, public_slug FROM listed_servers WHERE public_slug = $1 AND published",
        [request.params.slug],
      );
      if (!listing.rowCount) return response.sendStatus(404);
      return response.json({ server: listing.rows[0] });
    } catch (error) {
      return next(error);
    }
  },
);

app.get("/api/v1/me", optionalSession, (request, response) => {
  if (!request.user) return response.sendStatus(401);
  response.json({ user: request.user });
});

app.get(
  "/api/v1/me/servers",
  requireSession,
  async (request, response, next) => {
    try {
      const result = await pool.query(
        "SELECT s.id::text, s.name, s.hostname, s.port, s.transport::text, s.published, s.public_slug, s.description, s.rules_content, s.official_rules_url, m.role::text FROM listed_servers s JOIN listed_server_members m ON m.server_id = s.id WHERE m.discord_user_id = $1 ORDER BY s.created_at DESC",
        [request.user.id],
      );
      response.json({ servers: result.rows });
    } catch (error) {
      next(error);
    }
  },
);

app.post("/api/v1/servers", requireSession, async (request, response, next) => {
  const listing = validateListing(request.body);
  if (!listing)
    return response.status(400).json({ error: "invalid server payload" });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const inserted = await client.query(
      "INSERT INTO listed_servers (name, hostname, port, transport, public_slug, description, rules_content, official_rules_url) VALUES ($1, $2, $3, $4::listing_transport, $5, $6, $7, $8) RETURNING id::text, name, hostname, port, transport::text, published, public_slug, description, rules_content, official_rules_url",
      [
        listing.name,
        listing.hostname,
        listing.port,
        listing.transport,
        listing.publicSlug,
        listing.description,
        listing.rulesContent,
        listing.officialRulesUrl,
      ],
    );
    await client.query(
      "INSERT INTO listed_server_members (server_id, discord_user_id, role) VALUES ($1::uuid, $2, 'owner')",
      [inserted.rows[0].id, request.user.id],
    );
    await client.query(
      "INSERT INTO monitor_import_jobs (server_id) VALUES ($1::uuid) ON CONFLICT (server_id) DO UPDATE SET attempts = 0, next_attempt_at = now(), imported_at = NULL, last_error = NULL, updated_at = now()",
      [inserted.rows[0].id],
    );
    await client.query("COMMIT");
    if (monitorImport) void flushMonitorImports();
    response
      .status(201)
      .json({ server: { ...inserted.rows[0], role: "owner" } });
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
});

app.post(
  "/api/v1/servers/:serverId/members",
  requireSession,
  async (request, response, next) => {
    const discordUserId = request.body?.discord_user_id;
    const role = request.body?.role;
    if (
      typeof discordUserId !== "string" ||
      !/^[0-9]{5,30}$/.test(discordUserId) ||
      !["owner", "manager", "viewer"].includes(role)
    )
      return response.status(400).json({ error: "invalid member payload" });
    try {
      const owner = await pool.query(
        "SELECT 1 FROM listed_server_members WHERE server_id = $1::uuid AND discord_user_id = $2 AND role = 'owner'",
        [request.params.serverId, request.user.id],
      );
      if (!owner.rowCount) return response.sendStatus(403);
      await pool.query(
        "INSERT INTO listed_server_members (server_id, discord_user_id, role) VALUES ($1::uuid, $2, $3::listing_member_role) ON CONFLICT (server_id, discord_user_id) DO UPDATE SET role = EXCLUDED.role",
        [request.params.serverId, discordUserId, role],
      );
      return response
        .status(201)
        .json({ discord_user_id: discordUserId, role });
    } catch (error) {
      return next(error);
    }
  },
);

// This narrow service contract deliberately exposes no administration secrets.
app.get(
  "/api/v1/monitor/servers/:serverId",
  requireBearer(monitorToken),
  async (request, response, next) => {
    try {
      const listing = await pool.query(
        "SELECT id::text, name, hostname, port, transport::text FROM listed_servers WHERE id = $1::uuid AND published",
        [request.params.serverId],
      );
      if (!listing.rowCount) return response.sendStatus(404);
      const members = await pool.query(
        "SELECT discord_user_id, role::text FROM listed_server_members WHERE server_id = $1::uuid ORDER BY role, discord_user_id",
        [request.params.serverId],
      );
      return response.json({ server: listing.rows[0], members: members.rows });
    } catch (error) {
      return next(error);
    }
  },
);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "internal server error" });
});
app.listen(
  Number.parseInt(process.env.HTTP_PORT ?? "3000", 10),
  process.env.HTTP_ADDR ?? "0.0.0.0",
  () => console.log("VoxelLink API listening"),
);

function validateListing(value) {
  const {
    name,
    hostname,
    port = 25565,
    transport = "DIRECT",
    public_slug: publicSlug = null,
    description = "",
    rules_content: rulesContent = "",
    official_rules_url: officialRulesUrl = null,
  } = value ?? {};
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof hostname !== "string" ||
    !hostname.trim() ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    (publicSlug !== null &&
      (typeof publicSlug !== "string" ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(publicSlug))) ||
    typeof description !== "string" ||
    description.length > 5000 ||
    typeof rulesContent !== "string" ||
    rulesContent.length > 20000 ||
    (officialRulesUrl !== null &&
      (typeof officialRulesUrl !== "string" ||
        officialRulesUrl.length > 2048 ||
        !/^https:\/\//.test(officialRulesUrl))) ||
    !["DIRECT", "CLOUDFLARE_TUNNEL", "CLOUDFLARE_SPECTRUM"].includes(transport)
  )
    return null;
  return {
    name: name.trim(),
    hostname: hostname.trim(),
    port,
    transport,
    publicSlug: publicSlug?.trim() || null,
    description: description.trim(),
    rulesContent: rulesContent.trim(),
    officialRulesUrl: officialRulesUrl?.trim() || null,
  };
}
function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} must be set`);
  return value;
}
function monitorImportConfig() {
  const baseUrl = process.env.VOXELLINK_MONITOR_IMPORT_URL?.replace(/\/$/, "");
  const token = process.env.VOXELLINK_MONITOR_IMPORT_TOKEN;
  if (!baseUrl && !token) return null;
  if (!baseUrl || !token)
    throw new Error(
      "VOXELLINK_MONITOR_IMPORT_URL and VOXELLINK_MONITOR_IMPORT_TOKEN must be set together",
    );
  return { baseUrl, token };
}
async function flushMonitorImports() {
  if (!monitorImport || flushingMonitorImports) return;
  flushingMonitorImports = true;
  try {
    const jobs = await pool.query(
      "SELECT server_id::text, attempts FROM monitor_import_jobs WHERE imported_at IS NULL AND next_attempt_at <= now() ORDER BY created_at LIMIT 20",
    );
    for (const job of jobs.rows) await deliverMonitorImport(job);
  } catch (error) {
    console.error("Monitor import queue failed", error);
  } finally {
    flushingMonitorImports = false;
  }
}
async function deliverMonitorImport(job) {
  try {
    const response = await fetch(
      `${monitorImport.baseUrl}/api/v1/integrations/voxellink/import`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${monitorImport.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ external_server_id: job.server_id }),
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!response.ok)
      throw new Error(`Monitor returned HTTP ${response.status}`);
    await pool.query(
      "UPDATE monitor_import_jobs SET imported_at = now(), last_error = NULL, updated_at = now() WHERE server_id = $1::uuid",
      [job.server_id],
    );
  } catch (error) {
    const attempts = Number(job.attempts) + 1;
    const retryAfterMs = Math.min(
      60 * 60 * 1000,
      30_000 * 2 ** Math.min(attempts - 1, 7),
    );
    await pool.query(
      "UPDATE monitor_import_jobs SET attempts = $2, next_attempt_at = $3, last_error = $4, updated_at = now() WHERE server_id = $1::uuid",
      [
        job.server_id,
        attempts,
        new Date(Date.now() + retryAfterMs),
        String(error).slice(0, 500),
      ],
    );
    console.warn("Monitor import delivery failed", {
      serverId: job.server_id,
      attempts,
    });
  }
}
function requireBearer(expected) {
  return (request, response, next) => {
    const value = request.get("authorization")?.replace(/^Bearer /, "") ?? "";
    const expectedBuffer = Buffer.from(expected);
    const valueBuffer = Buffer.from(value);
    if (
      valueBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(valueBuffer, expectedBuffer)
    )
      return response.sendStatus(401);
    return next();
  };
}
function optionalSession(request, _response, next) {
  request.user = readSession(request);
  next();
}
function requireSession(request, response, next) {
  request.user = readSession(request);
  if (!request.user) return response.sendStatus(401);
  return next();
}
function setSession(response, user) {
  const payload = Buffer.from(
    JSON.stringify({ ...user, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }),
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", sessionSecret)
    .update(payload)
    .digest("base64url");
  response.cookie("voxellink_session", `${payload}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: publicBaseUrl.startsWith("https://"),
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
function readSession(request) {
  const encoded = request.headers.cookie
    ?.split("; ")
    .find((item) => item.startsWith("voxellink_session="))
    ?.slice("voxellink_session=".length);
  if (!encoded) return null;
  const [payload, signature] = encoded.split(".");
  if (!payload || !signature) return null;
  const expected = crypto
    .createHmac("sha256", sessionSecret)
    .update(payload)
    .digest("base64url");
  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  )
    return null;
  try {
    const user = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof user.id === "string" &&
      typeof user.username === "string" &&
      user.exp > Date.now()
      ? { id: user.id, username: user.username }
      : null;
  } catch {
    return null;
  }
}
