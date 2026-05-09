"use client";

import { useSingleVerify } from "../hooks/useSingleVerify";
import { EmailInputCard }                  from "./EmailInputCard";
import { VerificationResultCard }          from "./VerificationResultCard";
import { ResultBreakdownCard }             from "./ResultBreakdownCard";
import { VerificationSummaryCard }         from "./VerificationSummaryCard";
import { RecentSingleVerificationsTable }  from "./RecentSingleVerificationsTable";
import { ProTipCard }                      from "./ProTipCard";

export function SingleVerifyView() {
  const { state, result, verify } = useSingleVerify();
  const isLoading = state === "loading";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* ── Left / main column ── */}
      <div className="lg:col-span-2 space-y-4">
        <EmailInputCard onVerify={verify} isLoading={isLoading} />

        {result && (
          <>
            <VerificationResultCard result={result} />
            <ResultBreakdownCard checks={result.checks} />
          </>
        )}

        <RecentSingleVerificationsTable />
      </div>

      {/* ── Right sidebar ── */}
      <div className="space-y-4">
        <VerificationSummaryCard />
        <ProTipCard />
      </div>
    </div>
  );
}
