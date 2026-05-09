import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/src/components/shared/ProgressBar";
import { formatEta, formatNumber, cn } from "@/src/lib/utils";
import type { BulkActiveJob } from "../types";

const SUMMARY = [
  { key: "valid"      as const, label: "Valid",      textColor: "text-emerald-600", bgColor: "bg-emerald-50" },
  { key: "invalid"    as const, label: "Invalid",    textColor: "text-red-500",     bgColor: "bg-red-50"     },
  { key: "risky"      as const, label: "Risky",      textColor: "text-amber-600",   bgColor: "bg-amber-50"   },
  { key: "disposable" as const, label: "Disposable", textColor: "text-violet-600",  bgColor: "bg-violet-50"  },
];

interface Props { job: BulkActiveJob }

export function BulkActiveVerificationCard({ job }: Props) {
  const total = job.valid + job.invalid + job.risky + job.disposable;

  return (
    <Card>
      <CardContent className="pt-2 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Active Verification</h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Processing
          </span>
        </div>

        {/* File info */}
        <div>
          <p className="text-sm font-semibold truncate">{job.fileName}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Uploaded on {job.uploadedAt}</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <ProgressBar value={job.progress} size="md" className="flex-1" />
          <span className="text-sm font-bold tabular-nums shrink-0">{job.progress}%</span>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Processed", value: `${formatNumber(job.processedCount)} / ${formatNumber(job.totalCount)}` },
            { label: "ETA",       value: formatEta(job.etaSeconds) },
            { label: "Started",   value: job.startedAt },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] text-muted-foreground">{label}</p>
              <p className="text-xs font-semibold tabular-nums truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Summary chips */}
        <div className="grid grid-cols-4 gap-1.5">
          {SUMMARY.map(({ key, label, textColor, bgColor }) => {
            const val = job[key];
            const pct = total > 0 ? ((val / total) * 100).toFixed(1) : "0";
            return (
              <div key={key} className={cn("flex flex-col items-center rounded-xl py-2.5 px-1", bgColor)}>
                <span className={cn("text-sm font-bold tabular-nums", textColor)}>{formatNumber(val)}</span>
                <span className={cn("text-[10px] font-medium opacity-80", textColor)}>{label}</span>
                <span className={cn("text-[10px] opacity-60", textColor)}>{pct}%</span>
              </div>
            );
          })}
        </div>

        {/* Download buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download size={13} /> Download Verified Emails
          </Button>
          <Button size="sm" className="gradient-brand border-0 text-white hover:opacity-90 gap-1.5 text-xs">
            <Download size={13} /> Download Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
