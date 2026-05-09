import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { cn } from "@/src/lib/utils";
import { EMAIL_STATUS_CONFIG, RISK_CONFIG } from "../constants";
import type { RecentVerification } from "../types";
import { MOCK_RECENT_VERIFICATIONS } from "../mock";

function StatusBadge({ status }: { status: RecentVerification["status"] }) {
  const cfg = EMAIL_STATUS_CONFIG[status];
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
      cfg.className
    )}>
      {cfg.label}
    </span>
  );
}

function RiskCell({ risk }: { risk: RecentVerification["risk"] }) {
  const cfg = RISK_CONFIG[risk];
  return (
    <span className={cn("flex items-center gap-1.5 text-xs font-medium", cfg.textColor)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dotColor)} />
      {cfg.label}
    </span>
  );
}

interface RecentSingleVerificationsTableProps {
  records?: RecentVerification[];
}

export function RecentSingleVerificationsTable({
  records = MOCK_RECENT_VERIFICATIONS,
}: RecentSingleVerificationsTableProps) {
  return (
    <Card className="overflow-hidden gap-0 py-0">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold">Recent Single Verifications</h2>
        <a href="#" className="text-xs font-semibold text-primary hover:underline">View all</a>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead>Email</TableHead>
            <TableHead className="w-28">Status</TableHead>
            <TableHead className="w-24">Risk</TableHead>
            <TableHead className="w-44">Verified At</TableHead>
            <TableHead className="w-16">Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium text-sm">{r.email}</TableCell>
              <TableCell><StatusBadge status={r.status} /></TableCell>
              <TableCell><RiskCell risk={r.risk} /></TableCell>
              <TableCell className="text-sm text-muted-foreground">{r.verifiedAt}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Download report for ${r.email}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Download size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
