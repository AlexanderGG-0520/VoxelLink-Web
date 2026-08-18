import { FormEvent, useEffect, useState } from "react";
import type { InputHTMLAttributes } from "react";

type Server = {
  id: string;
  name: string;
  hostname: string;
  port: number;
  transport: string;
  published: boolean;
  role: string;
};

export function ConsolePage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [servers, setServers] = useState<Server[]>([]);
  const [message, setMessage] = useState("");

  const load = async () => {
    const me = await fetch("/api/v1/me", { credentials: "include" });
    if (!me.ok) return;
    setUser((await me.json()).user);
    const listed = await fetch("/api/v1/me/servers", {
      credentials: "include",
    });
    if (listed.ok) setServers((await listed.json()).servers);
  };
  useEffect(() => {
    void load();
  }, []);

  if (!user) {
    const loginMessage =
      message ||
      (new URLSearchParams(location.search).get("error") === "oauth"
        ? "Discordログインを完了できませんでした。もう一度お試しください。"
        : "");
    return <Login message={loginMessage} />;
  }
  return (
    <main className="mx-auto grid w-[min(980px,calc(100%_-_2rem))] gap-8 py-12 sm:w-[min(980px,calc(100%_-_2.5rem))]">
      <header className="grid gap-3 border-b border-line pb-8">
        <p className="text-xs font-extrabold tracking-wide text-cyan">
          Server Console
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          掲載を管理する
        </h1>
        <p className="text-muted">
          {user.username}
          としてログイン中。作成した掲載のownerは、管理メンバーを追加できます。
        </p>
        <button
          className="w-max text-sm font-bold text-cyan underline"
          onClick={async () => {
            await fetch("/auth/logout", {
              method: "POST",
              credentials: "include",
            });
            location.reload();
          }}
        >
          ログアウト
        </button>
      </header>
      <NewServer
        onCreated={(server) => {
          setServers((current) => [server, ...current]);
          setMessage("掲載を作成しました。");
        }}
        onError={setMessage}
      />
      {message ? (
        <p className="rounded border border-line bg-panel p-4 text-copy-secondary">
          {message}
        </p>
      ) : null}
      <section className="grid gap-4" aria-labelledby="your-servers">
        <h2 id="your-servers" className="text-2xl font-bold">
          自分の掲載
        </h2>
        {servers.length ? (
          servers.map((server) => (
            <ServerCard key={server.id} server={server} onError={setMessage} />
          ))
        ) : (
          <p className="rounded-lg border border-line bg-panel p-6 text-muted">
            まだ掲載がありません。
          </p>
        )}
      </section>
    </main>
  );
}

function Login({ message }: { message: string }) {
  return (
    <main className="mx-auto grid w-[min(720px,calc(100%_-_2rem))] gap-5 py-16 text-center">
      <p className="text-xs font-extrabold tracking-wide text-cyan">
        Server Console
      </p>
      <h1 className="text-4xl font-bold">掲載を管理する</h1>
      <p className="text-muted">
        Discordアカウントでログインすると、自分のMinecraftサーバー掲載を作成・管理できます。
      </p>
      {message ? <p className="text-red-300">{message}</p> : null}
      <a
        className="mx-auto rounded-md border border-line-strong bg-cyan/10 px-5 py-3 font-extrabold text-cyan hover:bg-cyan/20"
        href="/auth/discord/login"
      >
        Discordでログイン
      </a>
    </main>
  );
}

function NewServer({
  onCreated,
  onError,
}: {
  onCreated: (server: Server) => void;
  onError: (message: string) => void;
}) {
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/v1/servers", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        hostname: form.get("hostname"),
        port: Number(form.get("port")),
        transport: form.get("transport"),
      }),
    });
    if (!response.ok)
      return onError(
        "掲載を作成できませんでした。入力内容を確認してください。",
      );
    onCreated((await response.json()).server);
    event.currentTarget.reset();
  };
  return (
    <section
      className="grid gap-5 rounded-lg border border-line bg-panel-elevated p-6"
      aria-labelledby="new-server"
    >
      <h2 id="new-server" className="text-2xl font-bold">
        新しい掲載
      </h2>
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
        <Field label="表示名" name="name" required />
        <Field
          label="ホスト名"
          name="hostname"
          placeholder="play.example.com"
          required
        />
        <Field
          label="ポート"
          name="port"
          type="number"
          defaultValue="25565"
          min="1"
          max="65535"
          required
        />
        <label className="grid gap-2 text-sm font-bold">
          接続方式
          <select
            className="rounded border border-line bg-panel-solid p-3 text-copy"
            name="transport"
            defaultValue="DIRECT"
          >
            <option value="DIRECT">直接接続</option>
            <option value="CLOUDFLARE_TUNNEL">Cloudflare Tunnel</option>
            <option value="CLOUDFLARE_SPECTRUM">Cloudflare Spectrum</option>
          </select>
        </label>
        <button
          className="rounded-md bg-cyan px-5 py-3 font-extrabold text-[#062126] sm:col-span-2"
          type="submit"
        >
          掲載を作成
        </button>
      </form>
    </section>
  );
}

function ServerCard({
  server,
  onError,
}: {
  server: Server;
  onError: (message: string) => void;
}) {
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/v1/servers/${server.id}/members`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        discord_user_id: form.get("discord_user_id"),
        role: form.get("role"),
      }),
    });
    if (!response.ok)
      return onError(
        "メンバーを追加できませんでした。owner権限とDiscordユーザーIDを確認してください。",
      );
    onError("メンバーを追加しました。");
    event.currentTarget.reset();
  };
  return (
    <article className="grid gap-4 rounded-lg border border-line bg-panel p-6">
      <div>
        <h3 className="text-xl font-bold">{server.name}</h3>
        <p className="text-muted">
          {server.hostname}:{server.port} ・ {server.transport} ・ あなたの権限:{" "}
          {server.role}
        </p>
      </div>
      {server.role === "owner" ? (
        <form
          className="grid gap-3 sm:grid-cols-[1fr_10rem_auto]"
          onSubmit={submit}
        >
          <Field
            label="DiscordユーザーID"
            name="discord_user_id"
            placeholder="123456789"
            required
          />
          <label className="grid gap-2 text-sm font-bold">
            権限
            <select
              className="rounded border border-line bg-panel-solid p-3 text-copy"
              name="role"
            >
              <option value="manager">manager</option>
              <option value="viewer">viewer</option>
              <option value="owner">owner</option>
            </select>
          </label>
          <button
            className="mt-auto rounded border border-line-strong px-4 py-3 font-bold text-cyan"
            type="submit"
          >
            追加
          </button>
        </form>
      ) : null}
    </article>
  );
}

function Field(
  props: InputHTMLAttributes<HTMLInputElement> & { label: string },
) {
  const { label, ...input } = props;
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input
        className="rounded border border-line bg-panel-solid p-3 font-normal text-copy"
        {...input}
      />
    </label>
  );
}
