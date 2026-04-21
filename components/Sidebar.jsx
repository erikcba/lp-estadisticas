"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";

const Sidebar = () => {
  const pathname = usePathname();
      const navLinks = [
        { name: 'Liga Profesional', href: '/' },
        { name: 'Copa Argentina', href: '/copaArgentina' },
        { name: 'Primera Nacional', href: '/primeraNac' },
        { name: 'Foro', href: '/foro' },
    ];

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-zinc-600/30 bg-[#111318] pt-24 text-white lg:block">
      <div className="flex h-full flex-col py-4">
        <nav className="flex-1 space-y-1 px-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
