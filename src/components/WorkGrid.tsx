"use client";

import { useMemo, useState } from "react";
import type { Coverage, EventType, Story } from "@/content/types";
import { COVERAGE, EVENT_TYPES } from "@/content/types";
import { StoryCard } from "./StoryCard";

type Filters = { coverage?: Coverage; event?: EventType };

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
  const coverages = (Object.keys(COVERAGE) as Coverage[]).filter((k) => stories.some((s) => s.coverage === k));
  const events = EVENT_TYPES.filter((e) => stories.some((s) => s.events.includes(e)));

  const shown = useMemo(
    () =>
      stories.filter(
        (s) =>
          (!f.coverage || s.coverage === f.coverage) &&
          (!f.event || s.events.includes(f.event)),
      ),
    [stories, f],
  );

  const toggle = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setF((prev) => ({ ...prev, [key]: prev[key] === value ? undefined : value }));

  const rows: { label: string; items: { key: string; label: string; active: boolean; onClick: () => void }[] }[] = [
    { label: "Coverage", items: coverages.map((k) => ({ key: k, label: COVERAGE[k], active: f.coverage === k, onClick: () => toggle("coverage", k) })) },
    { label: "Event", items: events.map((e) => ({ key: e, label: e, active: f.event === e, onClick: () => toggle("event", e) })) },
  ];

  const anyActive = Boolean(f.coverage || f.event);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
      <div className="flex flex-col gap-5 border-y border-line py-8">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <p className="eyebrow w-24 shrink-0">{row.label}</p>
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
        <p className="mt-20 text-center text-muted">No stories match these filters.</p>
      )}
    </section>
  );
}
