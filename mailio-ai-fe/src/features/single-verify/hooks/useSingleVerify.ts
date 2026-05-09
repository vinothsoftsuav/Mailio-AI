"use client";

import { useState, useCallback } from "react";
import type { VerificationResult } from "../types";
import { MOCK_VERIFICATION_RESULT } from "../mock";

type VerifyState = "idle" | "loading" | "done" | "error";

interface UseSingleVerifyResult {
  state:    VerifyState;
  result:   VerificationResult | null;
  verify:   (email: string) => Promise<void>;
  reset:    () => void;
}

export function useSingleVerify(): UseSingleVerifyResult {
  const [state,  setState]  = useState<VerifyState>("idle");
  const [result, setResult] = useState<VerificationResult | null>(null);

  const verify = useCallback(async (email: string) => {
    setState("loading");
    setResult(null);
    try {
      // Swap this for a real API call: await fetch("/api/verify", { body: { email } })
      await new Promise((r) => setTimeout(r, 1400));
      setResult({ ...MOCK_VERIFICATION_RESULT, email });
      setState("done");
    } catch {
      setState("error");
    }
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setResult(null);
  }, []);

  return { state, result, verify, reset };
}
