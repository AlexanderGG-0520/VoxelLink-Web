ALTER TABLE listed_servers
  ADD COLUMN public_slug text,
  ADD COLUMN description text NOT NULL DEFAULT '',
  ADD COLUMN rules_content text NOT NULL DEFAULT '',
  ADD COLUMN official_rules_url text,
  ADD CONSTRAINT listed_servers_public_slug_format
    CHECK (public_slug IS NULL OR public_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');

CREATE UNIQUE INDEX listed_servers_public_slug_unique
  ON listed_servers (public_slug)
  WHERE public_slug IS NOT NULL;

INSERT INTO listed_servers (
  name, hostname, port, transport, public_slug, description, rules_content, official_rules_url
)
SELECT
  'Alec SMP 2!',
  'smp.alec-ofc.com',
  25565,
  'DIRECT',
  'alec-smp-2',
  'Alec SMP は、生活・建築・冒険をバランスよく楽しめるサバイバルマルチです。サクッと参加しても遊びやすく、拠点づくり・資源集め・交流が自然に回り始めます。「ガチすぎないけど、やることはちゃんとある」空気感を大切にしています。\n\n推奨バージョン: Java Edition 1.21.8\nJava IP: smp.alec-ofc.com\nBedrock Edition: smp.alec-ofc.com:19132',
  '## 基本ルール\n- 他プレイヤーへの嫌がらせ、暴言、差別的な発言、過度な煽りは禁止です。\n- 他人の建築物・チェスト・設備を、許可なく壊す、持ち去る、改変する行為は禁止です。\n- PvP は、相手の同意がある場合やイベント等で明示されている場合を除き禁止です。\n- トラブルになりそうな行為は避け、解決が難しい場合は運営へ相談してください。\n\n## 建築・ワールド利用\n- 建築は、ほかのプレイヤーの拠点や景観に配慮して行ってください。\n- 他人の拠点の近くへ建築する場合は、事前に相談するなど十分な距離と配慮をお願いします。\n- 地形を大きく壊したまま放置したり、景観を著しく損なう建築をしたりしないでください。\n- サーバーに負荷のかかる装置、放置、大量のエンティティやアイテムの発生は控えてください。\n\n## 禁止事項\n- チート、不正クライアント、不正なMod・リソースパック、バグ利用、不正な自動化の使用\n- 不具合や抜け道を利用してアイテム・権限・ゲーム上の利益を得る行為\n- なりすまし、個人情報の詮索・公開、外部サービスを含む迷惑行為\n- 宣伝目的の発言や、サーバーの雰囲気を損なうスパム行為\n- 運営判断で不適切と判断される行為\n\n## 対応について\nルール違反が確認された場合、注意・一時的な利用制限・永久利用停止などの対応を行うことがあります。悪質な場合は事前の警告なしに対応する場合があります。\n\nルールは、より快適に長く遊べるサーバーを維持するため、必要に応じて更新されます。公式規約と本ページの内容が異なる場合は、公式規約および運営からの案内を優先します。',
  'https://www.alec-ofc.com/terms'
WHERE NOT EXISTS (
  SELECT 1 FROM listed_servers WHERE public_slug = 'alec-smp-2'
);
