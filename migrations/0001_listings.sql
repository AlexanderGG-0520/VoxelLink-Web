CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE listing_transport AS ENUM ('DIRECT', 'CLOUDFLARE_TUNNEL', 'CLOUDFLARE_SPECTRUM');
CREATE TYPE listing_member_role AS ENUM ('owner', 'manager', 'viewer');

CREATE TABLE listed_servers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  hostname text NOT NULL CHECK (char_length(hostname) BETWEEN 1 AND 253),
  port integer NOT NULL DEFAULT 25565 CHECK (port BETWEEN 1 AND 65535),
  transport listing_transport NOT NULL DEFAULT 'DIRECT',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE listed_server_members (
  server_id uuid NOT NULL REFERENCES listed_servers(id) ON DELETE CASCADE,
  discord_user_id text NOT NULL CHECK (char_length(discord_user_id) BETWEEN 1 AND 32),
  role listing_member_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (server_id, discord_user_id)
);
