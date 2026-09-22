import type { Metadata } from "next";
import { site } from "@/content/site";
import { InquiryForm } from "./InquiryForm";

export const metadata: Metadata = {
  title: "Inquire",
  description: "Tell Ekta Weddings about your celebration: media, draping and styling.",
};

export default function InquirePage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-5 py-16 md:grid-cols-[1fr_1.6fr] md:gap-24 md:px-10 md:py-24">
      <div>
        <h1 className="font-serif text-5xl leading-[1.05] font-light md:text-6xl">Inquire</h1>
        <div className="mt-10 border-t border-line pt-6 text-sm">
          <p className="eyebrow">Or DM us</p>
          <a href={site.instagram.url} target="_blank" rel="noreferrer" className="mt-2 inline-block font-serif text-2xl hover:text-accent">
            @{site.instagram.handle}
          </a>
          {site.email && (
            <a href={`mailto:${site.email}`} className="mt-1 block hover:text-accent">{site.email}</a>
          )}
        </div>
      </div>
      <InquiryForm />
    </section>
  );
}
