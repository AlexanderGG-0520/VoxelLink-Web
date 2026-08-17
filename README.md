# VoxelLink Web + API

VoxelLink's public site and listing API. The API owns the canonical server listing and Discord membership records; VoxelLink Monitor imports a local monitoring copy through a narrow service-to-service endpoint.

## Local API

```sh
cp .env.example .env
# Set real secrets in .env
docker compose up --build
```

The `migrate` service applies PostgreSQL schema migrations before the API starts.

### Bootstrap a listing

`POST /api/v1/admin/servers` is intentionally a bootstrap-only administration API secured by `VOXELLINK_ADMIN_TOKEN`. It creates a listing plus explicit Discord owner/manager/viewer memberships. Discord OAuth owner administration is the next layer; it will replace this endpoint's operator-only workflow.

```json
{
  "name": "Example Server",
  "hostname": "play.example.com",
  "port": 25565,
  "transport": "DIRECT",
  "members": [{ "discord_user_id": "123456789", "role": "owner" }]
}
```

### VoxelLink Monitor contract

`GET /api/v1/monitor/servers/{server_id}` requires `Authorization: Bearer <VOXELLINK_MONITOR_TOKEN>` and returns the published listing and its verified Discord members. It contains no Cloudflare credentials. Set the same value as `VOXELLINK_API_TOKEN` in VoxelLink Monitor.

The endpoint matches the [Monitor integration contract](https://github.com/AlexanderGG-0520/voxellink-monitor/blob/main/docs/voxellink-integration.md).
