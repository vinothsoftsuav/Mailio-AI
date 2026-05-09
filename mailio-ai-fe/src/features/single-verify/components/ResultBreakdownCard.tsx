import {
  CheckCircle2, XCircle, Globe, Mail, AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";
import type { CheckItem } from "../types";

const ICON_MAP: Record<string, React.ElementType> = {
  CheckCircle2, XCircle, Globe, Mail, AlertCircle,
};

const CHECK_STYLE = {
  pass:    { ring: "border-emerald-100 bg-emerald-50", icon: "text-emerald-600", text: "text-emerald-700" },
  fail:    { ring: "border-red-100 bg-red-50",         icon: "text-red-500",     text: "text-red-600"     },
  warning: { ring: "border-amber-100 bg-amber-50",     icon: "text-amber-600",   text: "text-amber-700"   },
};

interface CheckChipProps { item: CheckItem }

function CheckChip({ item }: CheckChipProps) {
  const style = CHECK_STYLE[item.status];
  const Icon  = ICON_MAP[item.iconName] ?? CheckCircle2;

  return (
    <div className={cn(
      "flex flex-col items-center gap-1.5 rounded-xl border px-4 py-3 min-w-0",
      style.ring
    )}>
      <div className="flex items-center gap-1.5">
        <Icon size={15} className={style.icon} />
        <span className="text-xs font-semibold text-foreground">{item.label}</span>
      </div>
      <span className={cn("text-xs font-medium", style.text)}>{item.value}</span>
    </div>
  );
}

interface ResultBreakdownCardProps { checks: CheckItem[] }

export function ResultBreakdownCard({ checks }: ResultBreakdownCardProps) {
  return (
    <Card>
      <CardContent className="pt-2 space-y-3">
        <h2 className="text-sm font-semibold">Result Breakdown</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {checks.map((check) => (
            <CheckChip key={check.key} item={check} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
