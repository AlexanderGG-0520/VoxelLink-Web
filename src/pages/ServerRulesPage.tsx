import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

type PublicServer = {
  name: string;
  hostname: string;
  port: number;
  description: string;
  rules_content: string;
  official_rules_url: string | null;
};

export function ServerRulesPage() {
  const { slug } = useParams();
  const [server, setServer] = useState<PublicServer | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    void fetch(`/api/v1/public/servers/${encodeURIComponent(slug)}/rules`)
      .then(async (response) => {
        if (!response.ok) throw new Error("not found");
        return response.json();
      })
      .then((data) => setServer(data.server))
      .catch(() => setMissing(true));
  }, [slug]);

  if (missing) {
    return (
      <main className="mx-auto grid w-[min(720px,calc(100%_-_2rem))] gap-5 py-16 text-center">
        <h1 className="text-4xl font-bold">ページが見つかりません</h1>
        <Link className="font-bold text-cyan underline" to="/">
          VoxelLink トップへ戻る
        </Link>
      </main>
    );
  }

  if (!server) {
    return (
      <main className="mx-auto w-[min(920px,calc(100%_-_2rem))] py-16 text-muted">
        読み込み中です…
      </main>
    );
  }

  return (
    <main className="mx-auto w-[min(920px,calc(100%_-_2rem))] py-12 sm:w-[min(920px,calc(100%_-_2.5rem))] sm:py-18">
      <header className="grid gap-4 border-b border-line pb-8">
        <p className="text-xs font-extrabold tracking-wide text-cyan">
          Server rules
        </p>
        <h1 className="text-[clamp(2.7rem,7vw,5.1rem)] leading-none font-bold tracking-tight">
          {server.name}
        </h1>
        <p className="text-xl text-copy-secondary">サーバールール</p>
        <p className="whitespace-pre-line text-muted">{server.description}</p>
        <div className="rounded-lg border border-line bg-panel p-5 text-sm text-copy-secondary">
          <p>
            接続先:{" "}
            <strong className="text-copy">
              {server.hostname}:{server.port}
            </strong>
          </p>
        </div>
      </header>
      <div className="grid gap-7 pt-8">
        <RuleContent content={server.rules_content} />
        {server.official_rules_url ? (
          <a
            className="w-max font-extrabold text-legal-link underline decoration-legal-link/35 underline-offset-4 hover:text-legal-link-hover"
            href={server.official_rules_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            公式規約を確認する
          </a>
        ) : null}
      </div>
    </main>
  );
}

function RuleContent({ content }: { content: string }) {
  const blocks = content
    .replaceAll("\\n", "\n")
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);
  return blocks.map((block) => {
    const lines = block.split("\n");
    const heading = lines[0].match(/^(#{1,2})\s+(.+)/);
    const items = lines.filter((line) => line.startsWith("- "));
    if (heading) {
      const title = inlineMarkdown(heading[2]);
      return (
        <section className="grid gap-3" key={block}>
          {heading[1].length === 1 ? (
            <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          ) : (
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          )}
          {items.length > 0 ? (
            <ul className="grid gap-2">
              {items.map((item) => (
                <li
                  className="relative pl-6 text-muted before:absolute before:left-0 before:top-3 before:size-2 before:bg-cyan before:content-['']"
                  key={item}
                >
                  {inlineMarkdown(item.slice(2))}
                </li>
              ))}
            </ul>
          ) : lines.length > 1 ? (
            <p className="whitespace-pre-line text-muted">
              {inlineMarkdown(lines.slice(1).join("\n"))}
            </p>
          ) : null}
        </section>
      );
    }
    if (block === "---") return <hr className="border-line" key={block} />;
    return (
      <p className="whitespace-pre-line text-muted" key={block}>
        {inlineMarkdown(block)}
      </p>
    );
  });
}

function inlineMarkdown(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong className="font-extrabold text-copy" key={index}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            className="rounded bg-panel-solid px-1.5 py-0.5 text-copy"
            key={index}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return <span key={index}>{part}</span>;
    });
}
