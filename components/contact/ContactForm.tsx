"use client";

import * as React from "react";
import { useActionState } from "react";
import { sendContactEmail } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
              <Input
                name="name"
                placeholder="Cengiz"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Email</span>
              <Input
                name="email"
                type="email"
                placeholder="you@company.com"
              />
            </label>
          </div>

          <label className="space-y-1 text-sm">
            <span className="text-muted-foreground">Message *</span>
            <Textarea
              name="message"
              required
              rows={6}
              placeholder="Hi Cengiz — we’d like to chat about a junior developer role. Are you free this week?"
            />
          </label>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={pending} className="normal-case tracking-normal font-semibold">
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


