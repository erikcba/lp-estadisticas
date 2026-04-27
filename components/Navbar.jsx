"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/libs/utils";
import { NAV_LINKS } from "@/libs/nav-links";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#111318]/90 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-zinc-600/20">
        <div className="container mx-auto flex h-full flex-row items-center justify-between gap-3 px-4 py-3 lg:px-6 lg:py-5">
          <Link
            href="/"
            className="flex min-w-0 flex-col items-start justify-center text-left"
          >
            <h2 className="text-2xl font-black tracking-tighter text-[#b6c4ff] lg:text-3xl">
              ELP
            </h2>
            <p className="hidden text-xs font-medium tracking-tighter text-[#b6c4ff]/90 sm:block sm:text-sm lg:text-base">
              Estadisticas Liga Profesional
            </p>
          </Link>

          <div className="hidden items-center justify-center gap-3 lg:flex lg:gap-4">
            <Link
              href="/login"
              className="rounded-sm bg-[#1a2133] px-4 py-3 text-base font-semibold uppercase leading-none text-[#b6c4ff] transition-all ease-in-out hover:cursor-pointer hover:bg-[#203056]"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="rounded-sm bg-[#05a32d] px-4 py-3 text-base font-semibold uppercase leading-none text-[#030c33] transition-all ease-in-out hover:cursor-pointer hover:bg-[#0ac11f]"
            >
              Crear Cuenta
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-600/40 text-[#b6c4ff] transition-colors hover:bg-white/5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-100 flex flex-col bg-[#0b0c10] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navegación"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <span className="text-lg font-semibold text-white">Menú</span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-zinc-700/50 px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full rounded-md bg-[#1a2133] py-3 text-center text-sm font-semibold uppercase tracking-wide text-[#b6c4ff] transition-colors hover:bg-[#203056]"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="w-full rounded-md bg-[#05a32d] py-3 text-center text-sm font-semibold uppercase tracking-wide text-[#030c33] transition-colors hover:bg-[#0ac11f]"
              >
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
