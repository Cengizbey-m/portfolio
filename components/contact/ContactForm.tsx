"use client";

import * as React from "react";
import { useActionState } from "react";
import { sendContactEmail } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type State =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialState: State = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactEmail, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a message</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Name</span>
              <input
                name="name"
                className="h-10 w-full rounded-md border border-border bg-background px-3"
                placeholder="Cengiz"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Email</span>
              <input
                name="email"
                type="email"
                className="h-10 w-full rounded-md border border-border bg-background px-3"
                placeholder="you@company.com"
              />
            </label>
          </div>

          <label className="space-y-1 text-sm">
            <span className="text-muted-foreground">Message *</span>
            <textarea
              name="message"
              required
              rows={6}
              className="w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="Hi Cengiz — we’d like to chat about a junior developer role. Are you free this week?"
            />
          </label>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={pending}>
              {pending ? "Sending…" : "Send"}
            </Button>
            {state.status !== "idle" ? (
              <p
                className={
                  state.status === "success"
                    ? "text-sm text-foreground"
                    : "text-sm text-muted-foreground"
                }
              >
                {state.message}
              </p>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


