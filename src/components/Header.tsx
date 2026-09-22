"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "./Wordmark";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function Header({ treatments }: { treatments: Record<string, string> }) {
  const pathname = usePathname();
  const storySlug = pathname.match(/^\/work\/([^/]+)/)?.[1];
  const treatment = storySlug ? treatments[storySlug] : undefined;
  const [open, setOpen] = useState(false);

  return (
    <header data-treatment={treatment} className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
        <Wordmark />

        <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`eyebrow transition-colors hover:text-ink ${pathname.startsWith(l.href) ? "text-ink!" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/inquire"
            className="eyebrow rounded-full border border-ink px-5 py-2.5 text-ink! transition-colors hover:bg-ink hover:text-bg!"
          >
            Inquire
          </Link>
        </nav>

        <button
          type="button"
          className="eyebrow text-ink! md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-bg px-5 pb-8 pt-4 md:hidden" aria-label="Main">
          <ul className="flex flex-col gap-5">
            {[...links, { href: "/inquire", label: "Inquire" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-serif text-3xl" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
