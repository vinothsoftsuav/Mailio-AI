import {
  FolderOpen, Mail, CheckCircle2, Database, Clock,
  TrendingUp, TrendingDown, Minus,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { BulkStat } from "../types";
import { MOCK_BULK_STATS } from "../mock";

const ICON_MAP: Record<string, React.ElementType> = {
  FolderOpen, Mail, CheckCircle2, Database, Clock,
};

function StatTile({ stat }: { stat: BulkStat }) {
  const Icon   = ICON_MAP[stat.iconName] ?? Mail;
  const isUp   = stat.change > 0;
  const isDown = stat.change < 0;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", stat.iconBgColor)}>
        <Icon size={16} className={stat.iconColor} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground leading-tight truncate">{stat.label}</p>
        <p className="text-lg font-bold tabular-nums leading-tight">{stat.value}</p>
        <div className="flex items-center gap-1 mt-0.5">
          {stat.change === 0
            ? <Minus size={10} className="text-muted-foreground" />
            : isUp
              ? <TrendingUp size={10} className="text-emerald-500" />
              : <TrendingDown size={10} className="text-red-500" />}
          <span className={cn(
            "text-[11px]",
            stat.change === 0 ? "text-muted-foreground"
            : isUp ? "text-emerald-600" : "text-red-500"
          )}>
            {stat.subLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export function BulkStatsRow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {MOCK_BULK_STATS.map((s) => <StatTile key={s.id} stat={s} />)}
    </div>
  );
}
