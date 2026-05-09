import {
  Mail, BarChart3, Database, Clock,
  TrendingUp, TrendingDown, Minus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";
import type { SingleVerifyStat } from "../types";
import { MOCK_SINGLE_VERIFY_STATS } from "../mock";

const ICON_MAP: Record<string, React.ElementType> = { Mail, BarChart3, Database, Clock };

function StatTile({ stat }: { stat: SingleVerifyStat }) {
  const Icon    = ICON_MAP[stat.iconName] ?? Mail;
  const isUp    = stat.change > 0;
  const isDown  = stat.change < 0;
  const neutral = stat.change === 0;

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
        <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", stat.iconBgColor)}>
          <Icon size={14} className={stat.iconColor} />
        </div>
      </div>
      <p className="text-xl font-bold tabular-nums leading-none">{stat.value}</p>
      <div className="flex items-center gap-1">
        {neutral  ? <Minus size={11} className="text-muted-foreground" />
         : isUp   ? <TrendingUp size={11} className="text-emerald-500" />
                  : <TrendingDown size={11} className="text-red-500" />}
        {!neutral && (
          <span className={cn("text-[11px] font-semibold", isUp ? "text-emerald-600" : "text-red-500")}>
            {isUp ? "+" : ""}{stat.change}{typeof stat.change === "number" && Math.abs(stat.change) < 10 ? "s" : "%"}
          </span>
        )}
        <span className="text-[11px] text-muted-foreground truncate">{stat.changePeriod}</span>
      </div>
    </div>
  );
}

export function VerificationSummaryCard() {
  return (
    <Card>
      <CardContent className="pt-2 space-y-3">
        <h2 className="text-sm font-semibold">Verification Summary</h2>
        <div className="grid grid-cols-2 gap-2">
          {MOCK_SINGLE_VERIFY_STATS.map((stat) => (
            <StatTile key={stat.id} stat={stat} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
