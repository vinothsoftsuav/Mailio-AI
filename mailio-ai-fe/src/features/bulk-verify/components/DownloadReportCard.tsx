import { FileText, Table2, Braces, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FORMATS = [
  { label: "Download as CSV",   ext: ".csv",  Icon: FileText, variant: "outline" as const },
  { label: "Download as Excel", ext: ".xlsx", Icon: Table2,   variant: "outline" as const },
  { label: "Download as JSON",  ext: ".json", Icon: Braces,   variant: "outline" as const },
];

export function DownloadReportCard() {
  return (
    <Card>
      <CardContent className="pt-2 space-y-3">
        <div>
          <h2 className="text-sm font-semibold">Download Report</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Download cleaned list or full verification report.
          </p>
        </div>

        <div className="space-y-2">
          {FORMATS.map(({ label, ext, Icon }) => (
            <Button
              key={ext}
              variant="outline"
              className="w-full justify-between h-9 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <Icon size={14} className="text-muted-foreground" />
                {label}
              </span>
              <span className="text-xs text-muted-foreground font-mono">{ext}</span>
            </Button>
          ))}
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={11} />
          Reports are available for 7 days.
        </p>
      </CardContent>
    </Card>
  );
}
