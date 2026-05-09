import { MOCK_ACTIVE_JOB } from "../mock";
import { UploadCard } from "./UploadCard";
import { BulkStatsRow } from "./BulkStatsRow";
import { BulkActiveVerificationCard } from "./BulkActiveVerificationCard";
import { VerificationBreakdownCard } from "./VerificationBreakdownCard";
import { DownloadReportCard } from "./DownloadReportCard";
import { RecentBulkVerificationsTable } from "./RecentBulkVerificationsTable";

export function BulkVerifyView() {
  return (
    <div className="space-y-4">
      <BulkStatsRow />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left — upload + table */}
        <div className="lg:col-span-2 space-y-4">
          <UploadCard />
          <RecentBulkVerificationsTable />
        </div>

        {/* Right — active job + chart + download */}
        <div className="space-y-4">
          <BulkActiveVerificationCard job={MOCK_ACTIVE_JOB} />
          <VerificationBreakdownCard />
          <DownloadReportCard />
        </div>
      </div>
    </div>
  );
}
