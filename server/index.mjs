import crypto from "node:crypto";
import express from "express";
import pg from "pg";

const { Pool } = pg;
const app = express();
const pool = new Pool({ connectionString: required("DATABASE_URL") });
const monitorToken = required("VOXELLINK_MONITOR_TOKEN");
const adminToken = required("VOXELLINK_ADMIN_TOKEN");
app.use(express.json({ limit: "64kb" }));

app.get("/healthz", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.sendStatus(204);
  } catch {
    response.sendStatus(503);
  }
});

// This is the Monitor contract. It deliberately returns only a published
// listing and its explicit Discord membership, never administration secrets.
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

// Bootstrap administration API. Discord OAuth can replace this endpoint's
// administrator authentication without changing the Monitor contract above.
app.post(
  "/api/v1/admin/servers",
  requireBearer(adminToken),
  async (request, response, next) => {
    const {
      name,
      hostname,
      port = 25565,
      transport = "DIRECT",
      members = [],
    } = request.body ?? {};
    if (
      typeof name !== "string" ||
      typeof hostname !== "string" ||
      !Number.isInteger(port) ||
      !["DIRECT", "CLOUDFLARE_TUNNEL", "CLOUDFLARE_SPECTRUM"].includes(
        transport,
      ) ||
      !Array.isArray(members)
    )
      return response.status(400).json({ error: "invalid server payload" });
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const inserted = await client.query(
        "INSERT INTO listed_servers (name, hostname, port, transport) VALUES ($1, $2, $3, $4::listing_transport) RETURNING id::text, name, hostname, port, transport::text",
        [name.trim(), hostname.trim(), port, transport],
      );
      for (const member of members) {
        if (
          !member ||
          typeof member.discord_user_id !== "string" ||
          !["owner", "manager", "viewer"].includes(member.role)
        )
          throw new Error("invalid member payload");
        await client.query(
          "INSERT INTO listed_server_members (server_id, discord_user_id, role) VALUES ($1::uuid, $2, $3::listing_member_role)",
          [inserted.rows[0].id, member.discord_user_id, member.role],
        );
      }
      await client.query("COMMIT");
      response.status(201).json({ server: inserted.rows[0] });
    } catch (error) {
      await client.query("ROLLBACK");
      next(error);
    } finally {
      client.release();
    }
  },
);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "internal server error" });
});
const port = Number.parseInt(process.env.HTTP_PORT ?? "3000", 10);
app.listen(port, process.env.HTTP_ADDR ?? "0.0.0.0", () =>
  console.log(`VoxelLink API listening on ${port}`),
);

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
