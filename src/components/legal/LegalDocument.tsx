import type { LegalSectionData } from "../../data/legal";
import { lastUpdated, legalContactLinkText } from "../../data/legal";
import { siteUrls } from "../../data/site";

type LegalDocumentProps = {
  title: string;
  lead: string;
  sections: LegalSectionData[];
};
export function LegalDocument({ title, lead, sections }: LegalDocumentProps) {
  return (
    <article className="mx-auto w-[min(920px,calc(100%_-_2rem))] py-12 sm:w-[min(920px,calc(100%_-_2.5rem))] sm:py-18">
      <header className="grid gap-4 border-b border-line pb-8">
        <p className="text-xs font-extrabold tracking-wide text-cyan">Legal</p>
        <h1 className="text-[clamp(2.7rem,7vw,5.1rem)] leading-none font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted">{lead}</p>
        <span className="text-sm font-bold text-muted">
          最終更新日: {lastUpdated}
        </span>
      </header>
      <div className="grid gap-8 pt-8">
        {sections.map((section) => (
          <section className="grid gap-3.5" key={section.title}>
            <h2 className="text-xl leading-snug font-bold sm:text-3xl">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p className="text-muted" key={paragraph}>
                {paragraph}
              </p>
            ))}
            {section.items ? (
              <ul className="grid gap-2.5">
                {section.items.map((item) => (
                  <li
                    className="relative pl-6 text-muted before:absolute before:left-0 before:top-3 before:size-2 before:bg-cyan before:content-['']"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {section.contactLink ? (
              <p>
                <a
                  className="font-extrabold text-legal-link underline decoration-legal-link/35 underline-offset-4 hover:text-legal-link-hover"
                  href={siteUrls.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {legalContactLinkText}
                </a>
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
