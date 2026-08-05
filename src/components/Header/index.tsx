"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  const isHome = pathUrl === "/";

  return (
    <header
      className={`fixed left-0 top-0 z-1000 w-full transition-colors duration-200 ${
        stickyMenu
          ? "border-b border-white/10 bg-[#070b0a]/90 py-4 backdrop-blur-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className={`flex items-center gap-2.5 font-extrabold uppercase tracking-[0.2em] text-white ${
            isHome ? "text-base" : "text-sm"
          }`}
        >
          <Image
            src="/favicon.svg"
            alt="Rowen Hutchins logo"
            width={isHome ? 40 : 28}
            height={isHome ? 40 : 28}
            className={`rounded-md ${isHome ? "h-10 w-10" : "h-7 w-7"}`}
          />
          Rowen Hutchins
        </Link>

        <button
          type="button"
          aria-label={navigationOpen ? "Close menu" : "Open menu"}
          aria-expanded={navigationOpen}
          onClick={() => setNavigationOpen((open) => !open)}
          className="flex flex-col gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-200 ${navigationOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-opacity duration-200 ${navigationOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-200 ${navigationOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>

        <nav className="hidden items-center gap-9 lg:flex">
          {menuData.map((menuItem) => (
            <Link
              key={menuItem.id}
              href={menuItem.path ?? "/"}
              className={`text-base transition-colors duration-200 hover:text-[#5ed29c] ${
                pathUrl === menuItem.path ? "text-[#5ed29c]" : "text-white/80"
              }`}
            >
              {menuItem.title}
            </Link>
          ))}
        </nav>
      </div>

      {navigationOpen && (
        <nav className="flex flex-col gap-6 border-t border-white/10 bg-[#070b0a] px-6 py-8 lg:hidden">
          {menuData.map((menuItem) => (
            <Link
              key={menuItem.id}
              href={menuItem.path ?? "/"}
              onClick={() => setNavigationOpen(false)}
              className={`text-lg transition-colors duration-200 hover:text-[#5ed29c] ${
                pathUrl === menuItem.path ? "text-[#5ed29c]" : "text-white/80"
              }`}
            >
              {menuItem.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
