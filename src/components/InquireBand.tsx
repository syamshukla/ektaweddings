import Link from "next/link";
import { Reveal } from "./Reveal";

export function InquireBand() {
  return (
    <section className="border-t border-line">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-10 md:py-32">
        <div>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">Planning a wedding?</h2>
        </div>
        <Link
          href="/inquire"
          className="eyebrow shrink-0 rounded-full bg-ink px-8 py-4 text-bg! transition-opacity hover:opacity-85"
        >
          Inquire
        </Link>
      </Reveal>
    </section>
  );
}
