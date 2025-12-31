"use server";

import { Resend } from "resend";

type State =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function sendContactEmail(
  _prev: State,
  formData: FormData
): Promise<State> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!message) return { status: "error", message: "Message is required." };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "portfolio@resend.dev";

  if (!key || !to) {
    return {
      status: "error",
      message:
        "Email sending is not configured yet. Use the mailto link below (or set RESEND_API_KEY + CONTACT_TO_EMAIL on Vercel).",
    };
  }

  const resend = new Resend(key);

  await resend.emails.send({
    from,
    to,
    subject: `Portfolio contact: ${name || "Someone"}${email ? ` <${email}>` : ""}`,
    text: `Name: ${name || "(not provided)"}\nEmail: ${email || "(not provided)"}\n\n${message}`,
  });

  return { status: "success", message: "Sent. I’ll reply as soon as I can." };
}


