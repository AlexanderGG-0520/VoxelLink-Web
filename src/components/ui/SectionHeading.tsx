import type { ReactNode } from "react";
type SectionHeadingProps = { eyebrow: string; title: string; id: string; children?: ReactNode };
export function SectionHeading({ eyebrow, title, id, children }: SectionHeadingProps) {
  return <div className="mb-8 max-w-3xl"><p className="mb-3.5 text-xs font-extrabold tracking-wide text-cyan">{eyebrow}</p><h2 id={id} className="text-3xl leading-tight font-bold tracking-tight sm:text-5xl">{title}</h2>{children ? <p className="mt-3.5 text-muted">{children}</p> : null}</div>;
}
