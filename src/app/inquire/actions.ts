"use server";

import { site } from "@/content/site";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  /** Echoed back so the form keeps what the visitor typed after an error. */
  values?: Record<string, string | string[]>;
};

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim().slice(0, 4000);

export async function submitInquiry(_prev: InquiryState, fd: FormData): Promise<InquiryState> {
  // Honeypot: real people never fill this hidden field.
  if (str(fd, "company")) return { status: "success" };

  const data = {
    name: str(fd, "name"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    date: str(fd, "date"),
    location: str(fd, "location"),
    events: fd.getAll("events").map(String),
    services: fd.getAll("services").map(String),
    heardFrom: str(fd, "heardFrom"),
    message: str(fd, "message"),
  };

  const fieldErrors: Record<string, string> = {};
  if (!data.name) fieldErrors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) fieldErrors.email = "Please enter a valid email.";
  if (!data.message) fieldErrors.message = "Please add a message.";
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors, values: data };

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    `Event date: ${data.date || "-"}`,
    `Location: ${data.location || "-"}`,
    `Events: ${data.events.join(", ") || "-"}`,
    `Services: ${data.services.join(", ") || "-"}`,
    `Heard from: ${data.heardFrom || "-"}`,
    "",
    data.message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("\n[inquiry] Email not configured; printing instead:\n" + text + "\n");
      return { status: "success" };
    }
    console.error("[inquiry] RESEND_API_KEY / INQUIRY_TO_EMAIL not set");
    return {
      status: "error",
      values: data,
      message: `Our form is being set up. Please DM us on Instagram @${site.instagram.handle} for now.`,
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL || "Ekta Weddings <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject: `New inquiry: ${data.name}${data.date ? ` · ${data.date}` : ""}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[inquiry] Resend error", res.status, await res.text());
    return {
      status: "error",
      values: data,
      message: `Something went wrong sending your message. Please try again, or DM us @${site.instagram.handle}.`,
    };
  }

  return { status: "success" };
}
