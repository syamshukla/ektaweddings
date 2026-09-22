import Image from "next/image";
import type { Aspect, Media } from "@/content/types";

export const aspectClass: Record<Aspect, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  wide: "aspect-[2.39/1]",
};

type Props = {
  media: Media;
  sizes?: string;
  priority?: boolean;
  /** Override the frame shape (e.g. to force full-bleed heroes). */
  className?: string;
  fill?: boolean;
};

/*
  Renders an image, an autoplaying muted video, or a toned placeholder
  when no file has been added yet.
*/
export function MediaFrame({ media, sizes = "100vw", priority, className, fill }: Props) {
  const frame = `relative overflow-hidden bg-[var(--placeholder-a)] ${fill ? "h-full w-full" : aspectClass[media.aspect]} ${className ?? ""}`;

  if (!media.src) {
    return (
      <div
        className={frame}
        role="img"
        aria-label={`${media.alt} (placeholder)`}
        style={{ backgroundImage: "linear-gradient(135deg, var(--placeholder-a), var(--placeholder-b))" }}
      />
    );
  }

  if (media.kind === "video") {
    return (
      <div className={frame}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.src}
          poster={media.poster || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          aria-label={media.alt}
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={priority ? 90 : 75}
        className="object-cover"
      />
    </div>
  );
}
