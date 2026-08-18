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
const oauthStates = new Map();
app.use(express.json({ limit: "64kb" }));

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
    if (!tokenResponse.ok) return response.redirect("/console?error=oauth");
    const token = await tokenResponse.json();
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { authorization: `Bearer ${token.access_token}` },
    });
    if (!userResponse.ok) return response.redirect("/console?error=oauth");
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
        "SELECT s.id::text, s.name, s.hostname, s.port, s.transport::text, s.published, m.role::text FROM listed_servers s JOIN listed_server_members m ON m.server_id = s.id WHERE m.discord_user_id = $1 ORDER BY s.created_at DESC",
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
      "INSERT INTO listed_servers (name, hostname, port, transport) VALUES ($1, $2, $3, $4::listing_transport) RETURNING id::text, name, hostname, port, transport::text, published",
      [listing.name, listing.hostname, listing.port, listing.transport],
    );
    await client.query(
      "INSERT INTO listed_server_members (server_id, discord_user_id, role) VALUES ($1::uuid, $2, 'owner')",
      [inserted.rows[0].id, request.user.id],
    );
    await client.query("COMMIT");
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
  const { name, hostname, port = 25565, transport = "DIRECT" } = value ?? {};
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof hostname !== "string" ||
    !hostname.trim() ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !["DIRECT", "CLOUDFLARE_TUNNEL", "CLOUDFLARE_SPECTRUM"].includes(transport)
  )
    return null;
  return { name: name.trim(), hostname: hostname.trim(), port, transport };
}
function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} must be set`);
  return value;
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
