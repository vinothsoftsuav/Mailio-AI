"use client";

import { useState } from "react";
import { FileText, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, cn } from "@/src/lib/utils";
import { MOCK_USAGE_LOG } from "../mock";
import type { UsageEventType } from "../types";

const TYPE_OPTIONS: { label: string; value: "all" | UsageEventType }[] = [
  { label: "All",    value: "all"    },
  { label: "Single", value: "single" },
  { label: "Bulk",   value: "bulk"   },
];

export function UsageLogTable() {
  const [filter, setFilter] = useState<"all" | UsageEventType>("all");

  const rows = filter === "all"
    ? MOCK_USAGE_LOG
    : MOCK_USAGE_LOG.filter((r) => r.type === filter);

  return (
    <Card>
      <CardContent className="pt-3 space-y-3">
        {/* Header + filter */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-sm font-semibold">Usage Log</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Recent credit consumption</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1">
            {TYPE_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  filter === value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Email / File", "Type", "Credits Used", "Date & Time"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No entries for this filter.
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-b border-border last:border-0 transition-colors hover:bg-muted/20",
                      i % 2 === 1 && "bg-muted/10"
                    )}
                  >
                    <td className="px-3 py-2.5">
                      <span className="flex items-center gap-2">
                        {row.type === "single"
                          ? <Mail size={13} className="shrink-0 text-muted-foreground" />
                          : <FileText size={13} className="shrink-0 text-muted-foreground" />}
                        <span className="font-medium truncate max-w-56">{row.label}</span>
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={cn(
                        "rounded-md px-2 py-0.5 text-xs font-medium",
                        row.type === "single" ? "bg-blue-50 text-blue-700" : "bg-fuchsia-50 text-fuchsia-700"
                      )}>
                        {row.type === "single" ? "Single" : "Bulk"}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 tabular-nums font-semibold">
                      {formatNumber(row.credits)}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                      {row.occurredAt}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
