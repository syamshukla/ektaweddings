"use client";

import { useMemo, useState } from "react";
import type { EventType, GuestScale, Story, Treatment } from "@/content/types";
import { EVENT_TYPES, GUEST_SCALES, TREATMENTS } from "@/content/types";
import { StoryCard } from "./StoryCard";

type Filters = { event?: EventType; scale?: GuestScale; mood?: Treatment };

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active ? "border-ink bg-ink text-bg" : "border-line text-muted hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function WorkGrid({ stories }: { stories: Story[] }) {
  const [f, setF] = useState<Filters>({});

  // Only offer filters that match at least one story.
  const events = EVENT_TYPES.filter((e) => stories.some((s) => s.eventTypes.includes(e)));
  const scales = (Object.keys(GUEST_SCALES) as GuestScale[]).filter((k) => stories.some((s) => s.guestScale === k));
  const moods = (Object.keys(TREATMENTS) as Treatment[]).filter((k) => stories.some((s) => s.treatment === k));

  const shown = useMemo(
    () =>
      stories.filter(
        (s) =>
          (!f.event || s.eventTypes.includes(f.event)) &&
          (!f.scale || s.guestScale === f.scale) &&
          (!f.mood || s.treatment === f.mood),
      ),
    [stories, f],
  );

  const toggle = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setF((prev) => ({ ...prev, [key]: prev[key] === value ? undefined : value }));

  const rows: { label: string; items: { key: string; label: string; active: boolean; onClick: () => void }[] }[] = [
    { label: "Event", items: events.map((e) => ({ key: e, label: e, active: f.event === e, onClick: () => toggle("event", e) })) },
    {
      label: "Guests",
      items: scales.map((k) => ({ key: k, label: `${GUEST_SCALES[k].label} · ${GUEST_SCALES[k].detail}`, active: f.scale === k, onClick: () => toggle("scale", k) })),
    },
    { label: "Mood", items: moods.map((k) => ({ key: k, label: TREATMENTS[k].label, active: f.mood === k, onClick: () => toggle("mood", k) })) },
  ];

  const anyActive = Boolean(f.event || f.scale || f.mood);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
      <div className="flex flex-col gap-5 border-y border-line py-8">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <p className="eyebrow w-20 shrink-0">{row.label}</p>
            <div className="flex flex-wrap gap-2">
              {row.items.map((it) => (
                <Chip key={it.key} active={it.active} onClick={it.onClick}>
                  {it.label}
                </Chip>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between text-sm text-muted">
          <span aria-live="polite">
            {shown.length} {shown.length === 1 ? "story" : "stories"}
          </span>
          {anyActive && (
            <button type="button" onClick={() => setF({})} className="underline underline-offset-4 hover:text-ink">
              Clear filters
            </button>
          )}
        </div>
      </div>

      {shown.length ? (
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s, i) => (
            <StoryCard key={s.slug} story={s} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-20 text-center font-serif text-2xl text-muted italic">
          Nothing here yet. This one might be yours.
        </p>
      )}
    </section>
  );
}
