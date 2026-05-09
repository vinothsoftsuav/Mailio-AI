import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, cn } from "@/src/lib/utils";
import { MOCK_RECENT_JOBS } from "../mock";
import type { JobStatus } from "../types";

const STATUS_CONFIG: Record<JobStatus, { label: string; textColor: string; bgColor: string; dotColor: string }> = {
  completed:  { label: "Completed",  textColor: "text-emerald-700", bgColor: "bg-emerald-50 border-emerald-100", dotColor: "bg-emerald-500" },
  processing: { label: "Processing", textColor: "text-blue-700",    bgColor: "bg-blue-50 border-blue-100",       dotColor: "bg-blue-500 animate-pulse" },
  failed:     { label: "Failed",     textColor: "text-red-700",     bgColor: "bg-red-50 border-red-100",         dotColor: "bg-red-500" },
  queued:     { label: "Queued",     textColor: "text-amber-700",   bgColor: "bg-amber-50 border-amber-100",     dotColor: "bg-amber-500" },
};

function NumCell({ val }: { val: number | null }) {
  if (val === null) return <span className="text-muted-foreground">—</span>;
  return <span className="tabular-nums">{formatNumber(val)}</span>;
}

export function RecentBulkVerificationsTable() {
  return (
    <Card>
      <CardContent className="pt-2 space-y-3">
        <h2 className="text-sm font-semibold">Recent Bulk Verifications</h2>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["File", "Total Emails", "Status", "Valid", "Invalid", "Risky", "Disposable", "Actions"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_RECENT_JOBS.map((job, i) => {
                const cfg = STATUS_CONFIG[job.status];
                return (
                  <tr
                    key={job.id}
                    className={cn("border-b border-border last:border-0 transition-colors hover:bg-muted/20", i % 2 === 1 && "bg-muted/10")}
                  >
                    <td className="px-3 py-2.5 font-medium max-w-44 truncate">{job.fileName}</td>
                    <td className="px-3 py-2.5 tabular-nums text-muted-foreground">{formatNumber(job.totalEmails)}</td>
                    <td className="px-3 py-2.5">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold", cfg.bgColor, cfg.textColor)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dotColor)} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-emerald-600 font-semibold"><NumCell val={job.valid} /></td>
                    <td className="px-3 py-2.5 text-red-500 font-semibold"><NumCell val={job.invalid} /></td>
                    <td className="px-3 py-2.5 text-amber-600 font-semibold"><NumCell val={job.risky} /></td>
                    <td className="px-3 py-2.5 text-violet-600 font-semibold"><NumCell val={job.disposable} /></td>
                    <td className="px-3 py-2.5">
                      {job.status === "failed" ? (
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs px-2">
                          <RotateCcw size={12} /> Retry
                        </Button>
                      ) : job.status === "completed" ? (
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs px-2">
                          <Download size={12} /> Download
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground px-2">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
