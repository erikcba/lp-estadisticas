"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from "@/libs/utils";

const Sidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Liga Profesional', href: '/' },
        { name: 'Copa Argentina', href: '/copaArgentina' },
        { name: 'Primera Nacional', href: '/primeraNac' },
    ];

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 h-screen pt-24 border-r border-zinc-600/30 z-40 w-64 bg-[#111318] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            <div className="flex flex-col h-full py-4">

                <nav className="flex-1 space-y-1">
                    {navLinks.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)} // Cierra el sidebar al clickear en móvil
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 transition-colors",
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