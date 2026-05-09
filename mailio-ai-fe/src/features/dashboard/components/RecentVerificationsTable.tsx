import { Download, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/src/components/shared/Badge";
import { formatNumber } from "@/src/lib/utils";
import type { VerificationRecord } from "../types";

interface RecentVerificationsTableProps {
  records: VerificationRecord[];
}

function NumericCell({ value }: { value: number | null }) {
  if (value === null) return <span className="text-muted-foreground/40">—</span>;
  return <span className="tabular-nums font-medium">{formatNumber(value)}</span>;
}

function EmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="py-12 text-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <FileX size={32} strokeWidth={1.5} />
          <p className="text-sm font-medium">No verifications yet</p>
          <p className="text-xs">Upload a list to get started.</p>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function RecentVerificationsTable({ records }: RecentVerificationsTableProps) {
  return (
    <Card className="overflow-hidden gap-0 py-0">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold">Recent Verifications</h2>
        <a href="/results" className="text-xs font-semibold text-primary hover:underline">
          View all
        </a>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="w-50">File Name</TableHead>
            <TableHead className="w-28">Total Emails</TableHead>
            <TableHead className="w-28">Status</TableHead>
            <TableHead className="w-20">Valid</TableHead>
            <TableHead className="w-20">Invalid</TableHead>
            <TableHead className="w-20">Risky</TableHead>
            <TableHead className="w-16">Export</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {records.length === 0 ? (
            <EmptyState />
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  <span className="truncate max-w-45 block">{record.fileName}</span>
                </TableCell>
                <TableCell className="tabular-nums">{formatNumber(record.totalEmails)}</TableCell>
                <TableCell><StatusBadge status={record.status} /></TableCell>
                <TableCell><NumericCell value={record.valid} /></TableCell>
                <TableCell><NumericCell value={record.invalid} /></TableCell>
                <TableCell><NumericCell value={record.risky} /></TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={record.status !== "completed"}
                    aria-label={`Export ${record.fileName}`}
                    className="text-muted-foreground hover:text-primary disabled:opacity-30"
                  >
                    <Download size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
