"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";

interface FormData { email: string }
type VerifyState = "idle" | "loading" | "valid" | "invalid";

function ResultBanner({ state }: { state: VerifyState }) {
  if (state === "idle" || state === "loading") return null;
  const ok = state === "valid";
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium",
        ok ? "bg-emerald-50 text-emerald-700" : "bg-destructive/10 text-destructive"
      )}
      role="status"
    >
      {ok
        ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
        : <XCircle size={14} className="shrink-0" />}
      {ok ? "Email is valid and deliverable." : "Email is invalid or undeliverable."}
    </div>
  );
}

export function SingleVerifyCard() {
  const [verifyState, setVerifyState] = useState<VerifyState>("idle");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async ({ email }: FormData) => {
    setVerifyState("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setVerifyState(email.includes("@") ? "valid" : "invalid");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Single Email Verification</CardTitle>
        <CardDescription>Verify one email address instantly.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
          {/* Email input */}
          <div className="relative">
            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="email"
              placeholder="name@company.com"
              aria-invalid={!!errors.email}
              className="pl-9 h-10"
              {...register("email", {
                required: "Email is required.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." },
              })}
            />
          </div>

          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}

          <ResultBanner state={verifyState} />

          <Button
            type="submit"
            size="lg"
            disabled={verifyState === "loading"}
            className="w-full gradient-accent border-0 text-white hover:opacity-90"
          >
            {verifyState === "loading" ? (
              <><Loader2 size={15} className="animate-spin" /> Verifying…</>
            ) : (
              "Verify Now"
            )}
          </Button>
        </form>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          We&apos;ll check syntax, domain, mailbox and more.
        </p>
      </CardContent>
    </Card>
  );
}
