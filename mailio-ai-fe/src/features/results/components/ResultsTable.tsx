import { Download, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils";
import type { ResultRecord, EmailStatus, ResultsFilters } from "../types";

const STATUS_CONFIG: Record<EmailStatus, { label: string; textColor: string; bgColor: string; dotColor: string }> = {
  valid:       { label: "Valid",       textColor: "text-emerald-700", bgColor: "bg-emerald-50 border-emerald-100", dotColor: "bg-emerald-500" },
  invalid:     { label: "Invalid",     textColor: "text-red-600",     bgColor: "bg-red-50 border-red-100",         dotColor: "bg-red-500"     },
  risky:       { label: "Risky",       textColor: "text-amber-700",   bgColor: "bg-amber-50 border-amber-100",     dotColor: "bg-amber-400"   },
  disposable:  { label: "Disposable",  textColor: "text-violet-700",  bgColor: "bg-violet-50 border-violet-100",   dotColor: "bg-violet-500"  },
};

const PAGE_SIZES = [10, 25, 50] as const;

interface Props {
  records:   ResultRecord[];
  filters:   ResultsFilters;
  total:     number;
  onChange:  (patch: Partial<ResultsFilters>) => void;
}

export function ResultsTable({ records, filters, total, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize));

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Email / File", "Type", "Status", "Risk", "Verified At", "Actions"].map((h) => (
                <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-10 text-center text-sm text-muted-foreground">
                  No results match your filters.
                </td>
              </tr>
            ) : (
              records.map((row, i) => {
                const cfg = STATUS_CONFIG[row.status];
                return (
                  <tr
                    key={row.id}
                    className={cn("border-b border-border last:border-0 transition-colors hover:bg-muted/20", i % 2 === 1 && "bg-muted/10")}
                  >
                    {/* Label */}
                    <td className="px-3 py-2.5">
                      <span className="flex items-center gap-2">
                        {row.type === "single"
                          ? <Mail size={13} className="shrink-0 text-muted-foreground" />
                          : <FileText size={13} className="shrink-0 text-muted-foreground" />}
                        <span className="font-medium truncate max-w-52">{row.label}</span>
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-3 py-2.5">
                      <span className={cn(
                        "rounded-md px-2 py-0.5 text-xs font-medium",
                        row.type === "single" ? "bg-blue-50 text-blue-700" : "bg-fuchsia-50 text-fuchsia-700"
                      )}>
                        {row.type === "single" ? "Single" : "Bulk"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-2.5">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold", cfg.bgColor, cfg.textColor)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dotColor)} />
                        {cfg.label}
                      </span>
                    </td>

                    {/* Risk */}
                    <td className="px-3 py-2.5">
                      {row.risk === null ? (
                        <span className="text-xs text-muted-foreground">—</span>
                      ) : (
                        <span className={cn(
                          "text-xs font-medium",
                          row.risk === "low"    && "text-emerald-600",
                          row.risk === "medium" && "text-amber-600",
                          row.risk === "high"   && "text-red-600",
                        )}>
                          {row.risk.charAt(0).toUpperCase() + row.risk.slice(1)}
                        </span>
                      )}
                    </td>

                    {/* Verified At */}
                    <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                      {row.verifiedAt}
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-2.5">
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs px-2">
                        <Download size={12} /> Download
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Rows per page:</span>
          <div className="flex gap-1">
            {PAGE_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => onChange({ pageSize: size, page: 1 })}
                className={cn(
                  "rounded px-2 py-0.5 text-xs font-medium transition-colors",
                  filters.pageSize === size ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            {total === 0 ? "0" : `${(filters.page - 1) * filters.pageSize + 1}–${Math.min(filters.page * filters.pageSize, total)}`} of {total}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              disabled={filters.page <= 1}
              onClick={() => onChange({ page: filters.page - 1 })}
            >
              ← Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              disabled={filters.page >= totalPages}
              onClick={() => onChange({ page: filters.page + 1 })}
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
