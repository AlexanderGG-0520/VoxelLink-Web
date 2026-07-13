import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
export function SiteLayout() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-155 before:bg-[linear-gradient(90deg,rgb(102_225_236_/_2.4%),transparent_42%),linear-gradient(180deg,#081420_0%,transparent_72%)] after:pointer-events-none after:absolute after:inset-0 after:-z-20 after:bg-[linear-gradient(180deg,rgb(255_255_255_/_1.5%),transparent_360px),#07111f]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
