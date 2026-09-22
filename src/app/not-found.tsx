import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-40 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-5xl italic md:text-6xl">This page wandered off.</h1>
      <Link href="/work" className="eyebrow mt-10 border-b border-ink pb-1 text-ink!">Back to the work</Link>
    </section>
  );
}
