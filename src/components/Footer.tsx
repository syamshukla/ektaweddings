import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-serif text-3xl">Ekta Weddings</p>
          <p className="mt-1 text-sm text-muted">Ekta means unity. We bring families, rituals and stories together.</p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <p className="eyebrow mb-1">Explore</p>
          <Link href="/work" className="hover:text-accent">Work</Link>
          <Link href="/services" className="hover:text-accent">Services</Link>
          <Link href="/about" className="hover:text-accent">About</Link>
          <Link href="/inquire" className="hover:text-accent">Inquire</Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <p className="eyebrow mb-1">Say hello</p>
          <a href={site.instagram.url} target="_blank" rel="noreferrer" className="hover:text-accent">
            @{site.instagram.handle} on Instagram
          </a>
          {site.email && (
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
          )}
          <p className="text-muted">{site.serviceArea}</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-10 text-xs text-muted md:px-10">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
