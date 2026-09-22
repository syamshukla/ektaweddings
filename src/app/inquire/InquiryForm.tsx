"use client";

import { useActionState } from "react";
import { EVENT_TYPES, GUEST_SCALES } from "@/content/types";
import { submitInquiry, type InquiryState } from "./actions";

const SERVICES = ["Curated Media", "Draping", "Styling", "Not sure yet"];
const HEARD_FROM = ["Instagram", "A friend or family member", "A vendor", "Google", "Other"];

const input =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-muted/60 focus:border-ink";

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">{label}</label>
      {children}
      {error && <p id={`${name}-error`} className="mt-2 text-sm text-[#9b2c2c]">{error}</p>}
    </div>
  );
}

function Checks({ legend, name, options, checked = [] }: { legend: string; name: string; options: readonly string[]; checked?: string[] }) {
  return (
    <fieldset>
      <legend className="eyebrow">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="checkbox" name={name} value={o} defaultChecked={checked.includes(o)} className="peer sr-only" />
            <span className="inline-block rounded-full border border-line px-4 py-1.5 text-sm text-muted transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function InquiryForm() {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: "idle" });
  const fe = state.fieldErrors ?? {};
  const v = (k: string) => (typeof state.values?.[k] === "string" ? (state.values[k] as string) : undefined);
  const list = (k: string) => (Array.isArray(state.values?.[k]) ? (state.values[k] as string[]) : []);

  if (state.status === "success") {
    return (
      <div className="border-y border-line py-16 text-center" role="status">
        <p className="font-serif text-4xl italic md:text-5xl">Thank you.</p>
        <p className="mx-auto mt-4 max-w-md text-muted">
          We&apos;ve received your note and will be in touch within two days. In the meantime, come say hi on Instagram.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-10" noValidate>
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>Company <input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <Field label="Your name *" name="name" error={fe.name}>
          <input id="name" name="name" defaultValue={v("name")} autoComplete="name" className={input} aria-invalid={!!fe.name} aria-describedby={fe.name ? "name-error" : undefined} />
        </Field>
        <Field label="Email *" name="email" error={fe.email}>
          <input id="email" name="email" defaultValue={v("email")} type="email" autoComplete="email" className={input} aria-invalid={!!fe.email} aria-describedby={fe.email ? "email-error" : undefined} />
        </Field>
        <Field label="Phone" name="phone">
          <input id="phone" name="phone" defaultValue={v("phone")} type="tel" autoComplete="tel" className={input} />
        </Field>
        <Field label="Event date" name="date">
          <input id="date" name="date" defaultValue={v("date")} type="date" className={input} />
        </Field>
        <Field label="Location / venue" name="location">
          <input id="location" name="location" defaultValue={v("location")} className={input} placeholder="City, venue if known" />
        </Field>
        <Field label="Guest count" name="guests">
          <select id="guests" name="guests" className={input} defaultValue={v("guests") ?? ""}>
            <option value="" disabled>Select</option>
            {Object.values(GUEST_SCALES).map((g) => (
              <option key={g.label} value={`${g.label} (${g.detail})`}>{g.label}: {g.detail}</option>
            ))}
          </select>
        </Field>
      </div>

      <Checks legend="Which events?" name="events" options={EVENT_TYPES} checked={list("events")} />
      <Checks legend="What are you looking for?" name="services" options={SERVICES} checked={list("services")} />

      <Field label="Tell us about your celebration *" name="message" error={fe.message}>
        <textarea
          id="message"
          name="message"
          defaultValue={v("message")}
          rows={5}
          className={`${input} resize-y`}
          placeholder="The vibe, the families, the moments you care about most…"
          aria-invalid={!!fe.message}
          aria-describedby={fe.message ? "message-error" : undefined}
        />
      </Field>

      <Field label="How did you find us?" name="heardFrom">
        <select id="heardFrom" name="heardFrom" className={input} defaultValue={v("heardFrom") ?? ""}>
          <option value="" disabled>Select</option>
          {HEARD_FROM.map((h) => <option key={h}>{h}</option>)}
        </select>
      </Field>

      {state.message && <p className="text-[#9b2c2c]" role="alert">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="eyebrow self-start rounded-full bg-ink px-10 py-4 text-bg! transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
