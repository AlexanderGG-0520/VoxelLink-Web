# VoxelLink Web + API

VoxelLink's public site and listing API. The API owns the canonical server listing and Discord membership records; VoxelLink Monitor imports a local monitoring copy through a narrow service-to-service endpoint.

## Local API

```sh
cp .env.example .env
# Set real secrets in .env
docker compose up --build
```

The `migrate` service applies PostgreSQL schema migrations before the API starts.

### 掲載者コンソール

Discord Developer PortalでOAuth2のリダイレクトURLを`https://<公開URL>/auth/discord/callback`に設定し、`.env`へ`DISCORD_CLIENT_ID`、`DISCORD_CLIENT_SECRET`、`PUBLIC_BASE_URL`、十分に長い`SESSION_SECRET`を設定します。公開サイトの`/console`からDiscordでログインすると、本人を最初の`owner`として掲載を登録できます。

掲載のownerは、DiscordユーザーIDを指定してowner / manager / viewerを追加できます。掲載者向けの共通管理トークンはありません。

### VoxelLink Monitor contract

`GET /api/v1/monitor/servers/{server_id}` requires `Authorization: Bearer <VOXELLINK_MONITOR_TOKEN>` and returns the published listing and its verified Discord members. It contains no Cloudflare credentials. Set the same value as `VOXELLINK_API_TOKEN` in VoxelLink Monitor.

The endpoint matches the [Monitor integration contract](https://github.com/AlexanderGG-0520/voxellink-monitor/blob/main/docs/voxellink-integration.md).
