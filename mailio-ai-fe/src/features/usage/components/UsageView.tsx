import { PlanQuotaCard } from "./PlanQuotaCard";
import { UsageBreakdownTiles } from "./UsageBreakdownTiles";
import { UsageChart } from "./UsageChart";
import { UsageLogTable } from "./UsageLogTable";

export function UsageView() {
  return (
    <div className="space-y-4">
      {/* Top row: quota card + breakdown tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <PlanQuotaCard />
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center">
          <UsageBreakdownTiles />
        </div>
      </div>

      {/* Chart */}
      <UsageChart />

      {/* Log table */}
      <UsageLogTable />
    </div>
  );
}
