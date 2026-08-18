import { Link } from "react-router-dom";
import {
  footerNavigation,
  minecraftDisclaimer,
  siteDescription,
  siteUrls,
} from "../../data/site";
export function Footer() {
  return (
    <footer className="mx-auto flex w-[min(1160px,calc(100%_-_2rem))] flex-wrap justify-between gap-4 border-t border-line py-9 pb-12 sm:w-[min(1160px,calc(100%_-_2.5rem))]">
      <div className="grid max-w-2xl gap-1.5">
        <strong>VoxelLink</strong>
        <span className="text-muted">{siteDescription}</span>
        <span className="text-sm text-muted">{minecraftDisclaimer}</span>
        <a
          className="w-max text-sm font-bold text-legal-link underline decoration-legal-link/35 underline-offset-4 hover:text-legal-link-hover"
          href={`mailto:${siteUrls.contactEmail}`}
        >
          お問い合わせ: {siteUrls.contactEmail}
        </a>
      </div>
      <nav
        className="flex flex-wrap content-start gap-x-4 gap-y-2 text-sm font-bold text-navigation"
        aria-label="フッターナビゲーション"
      >
        {footerNavigation.map((item) => (
          <Link
            className="transition hover:text-copy"
            key={item.to}
            to={item.to}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
