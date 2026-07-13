type ListPanelProps = {
  title: string;
  items: string[];
  tone: "positive" | "caution";
};
export function ListPanel({ title, items, tone }: ListPanelProps) {
  const markerClass =
    tone === "positive" ? "before:bg-cyan" : "before:bg-caution";
  return (
    <article className="rounded-lg border border-line bg-panel p-6">
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li
            className={`relative pl-6 text-copy-secondary before:absolute before:left-0 before:top-3 before:size-2 before:shadow-[3px_3px_0_rgb(0_0_0_/_18%)] before:content-[''] ${markerClass}`}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
