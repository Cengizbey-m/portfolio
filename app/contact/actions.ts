"use server";

import { Resend } from "resend";

type State =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type ResendApiError = {
  statusCode?: number;
  name?: string;
  message?: string;
};

function isValidEmail(input: string) {
  // intentionally simple (good enough for contact forms)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

export async function sendContactEmail(
  _prev: State,
  formData: FormData
): Promise<State> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  // Honeypot: if filled, pretend success (don’t help bots).
  if (website) return { status: "success", message: "Sent. Thanks!" };

  if (message.length < 10) {
    return { status: "error", message: "Please write a little more detail (10+ characters)." };
  }
  if (message.length > 4000) {
    return { status: "error", message: "Message is too long (max 4000 characters)." };
  }
  if (email && !isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!key || !to) {
    return {
      status: "error",
      message:
        "The contact form is temporarily unavailable. Please email me directly (or reach out on LinkedIn).",
    };
  }

  const resend = new Resend(key);

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject: `Portfolio contact: ${name || "Someone"}${email ? ` <${email}>` : ""}`,
      text: `Name: ${name || "(not provided)"}\nEmail: ${email || "(not provided)"}\n\n${message}`,
      replyTo: email || undefined,
    });
    // Resend SDK often returns { data, error } and does NOT throw.
    // If we don't check this, the UI can show "Sent" even when delivery failed.
    if ((result as { error?: unknown }).error) {
      const err = (result as { error?: unknown }).error as ResendApiError;
      if (process.env.NODE_ENV !== "production") {
        // Don't print secrets; just enough to debug locally.
        console.error("Resend error:", err);
      }

      // Common: Resend testing-mode restriction
      if (
        err?.statusCode === 403 &&
        err?.name === "validation_error" &&
        typeof err.message === "string" &&
        err.message.includes("You can only send testing emails")
      ) {
        return {
          status: "error",
          message:
            "Email is still in Resend testing mode. To enable sending, verify a domain in Resend (Domains) or set CONTACT_TO_EMAIL to your Resend account email for testing.",
        };
      }

      return {
        status: "error",
        message:
          "Couldn’t send your message right now. Please try again or use email/LinkedIn.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try email or LinkedIn instead.",
    };
  }

  return { status: "success", message: "Sent. I’ll reply as soon as I can." };
}


