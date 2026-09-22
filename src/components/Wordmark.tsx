import Link from "next/link";

/* Text-only wordmark until a logo exists. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Ekta Weddings, home" className={`font-serif text-2xl tracking-wide md:text-[1.7rem] ${className}`}>
      Ekta Weddings
    </Link>
  );
}
