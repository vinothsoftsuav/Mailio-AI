import { Mail, MailOpen } from "lucide-react";
import { formatNumber } from "@/src/lib/utils";
import { MOCK_DAILY_USAGE } from "../mock";

export function UsageBreakdownTiles() {
  const totalSingle = MOCK_DAILY_USAGE.reduce((s, d) => s + d.single, 0);
  const totalBulk   = MOCK_DAILY_USAGE.reduce((s, d) => s + d.bulk,   0);
  const grand       = totalSingle + totalBulk;

  const tiles = [
    {
      label:    "Single Verifications",
      value:    totalSingle,
      pct:      grand > 0 ? ((totalSingle / grand) * 100).toFixed(1) : "0",
      Icon:     Mail,
      iconColor:   "text-blue-600",
      iconBgColor: "bg-blue-50",
      barColor:    "bg-blue-500",
    },
    {
      label:    "Bulk Verifications",
      value:    totalBulk,
      pct:      grand > 0 ? ((totalBulk / grand) * 100).toFixed(1) : "0",
      Icon:     MailOpen,
      iconColor:   "text-fuchsia-600",
      iconBgColor: "bg-fuchsia-50",
      barColor:    "bg-fuchsia-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {tiles.map(({ label, value, pct, Icon, iconColor, iconBgColor, barColor }) => (
        <div key={label} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBgColor}`}>
            <Icon size={16} className={iconColor} />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-xs text-muted-foreground leading-tight">{label}</p>
            <p className="text-xl font-bold tabular-nums leading-tight">{formatNumber(value)}</p>
            <div className="space-y-1">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-[11px] text-muted-foreground">{pct}% of total usage</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
