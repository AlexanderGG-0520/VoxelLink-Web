import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import iconUrl from "../../assets/voxellink-icon.png";
import { primaryNavigation, siteUrls } from "../../data/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false); }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  const closeMenu = () => setIsOpen(false);
  return <header className="mx-auto grid w-[min(1160px,calc(100%-2rem))] grid-cols-[1fr_auto_auto] items-center gap-4 py-4 sm:w-[min(1160px,calc(100%-2.5rem))] md:gap-6">
    <Link className="inline-flex w-max items-center gap-3 text-base font-extrabold" to="/" aria-label="VoxelLink トップへ" onClick={closeMenu}><img className="size-8 rounded-lg bg-panel shadow-[0_0_0_1px_rgb(245_249_255_/_10%)]" src={iconUrl} alt="" /><span>VoxelLink</span></Link>
    <nav className="hidden items-center gap-5 text-sm text-[#bfd1dc] md:flex" aria-label="主なナビゲーション">{primaryNavigation.map((item) => <Link className="py-1.5 transition hover:text-copy" key={item.to} to={item.to}>{item.label}</Link>)}</nav>
    <div className="flex items-center gap-3"><a className="hidden min-h-10 rounded-md border border-line-strong bg-cyan/5 px-4 py-2 text-sm font-extrabold text-[#e9fdff] transition hover:bg-cyan/10 sm:inline-flex" href={siteUrls.discordInvite} target="_blank" rel="noopener noreferrer">参加する</a><button className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-line bg-panel text-sm font-bold md:hidden" type="button" aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((open) => !open)}><span className="sr-only">ナビゲーションを{isOpen ? "閉じる" : "開く"}</span><span aria-hidden="true">{isOpen ? "×" : "☰"}</span></button></div>
    {isOpen ? <nav className="col-span-3 grid gap-1 rounded-lg border border-line bg-panel-solid p-3 md:hidden" id="mobile-navigation" aria-label="モバイルナビゲーション">{primaryNavigation.map((item) => <Link className="rounded px-3 py-2 text-[#d7e4ec] transition hover:bg-cyan/10 hover:text-copy" key={item.to} to={item.to} onClick={closeMenu}>{item.label}</Link>)}<a className="rounded px-3 py-2 font-bold text-cyan transition hover:bg-cyan/10" href={siteUrls.discordInvite} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Discordに参加する</a></nav> : null}
  </header>;
}
