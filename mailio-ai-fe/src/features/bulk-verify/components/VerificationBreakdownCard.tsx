import { Card, CardContent } from "@/components/ui/card";
import { DonutChart } from "@/src/components/charts/DonutChart";
import { formatNumber } from "@/src/lib/utils";
import { MOCK_CHART_DATA, MOCK_CHART_TOTAL } from "../mock";

export function VerificationBreakdownCard() {
  return (
    <Card>
      <CardContent className="pt-2 space-y-3">
        <h2 className="text-sm font-semibold">Verification Breakdown</h2>

        <DonutChart data={MOCK_CHART_DATA} total={MOCK_CHART_TOTAL} />

        <ul className="space-y-1.5" role="list">
          {MOCK_CHART_DATA.map((item) => (
            <li key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tabular-nums">{formatNumber(item.value)}</span>
                <span className="w-10 text-right text-xs text-muted-foreground tabular-nums">{item.percentage}</span>
              </div>
            </li>
          ))}
        </ul>

        <a href="/results" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          View full results →
        </a>
      </CardContent>
    </Card>
  );
}
