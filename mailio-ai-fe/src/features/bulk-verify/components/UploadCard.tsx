"use client";

import { useCallback, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";
import type { FilePreview } from "../types";

const MOCK_FILE_PREVIEW: FilePreview = {
  name:           "Spring Outreach List.csv",
  totalEmails:    10_000,
  duplicates:     320,
  detectedColumn: "Email Address",
};

export function UploadCard() {
  const [isDragging, setIsDragging] = useState(false);
  const [preview,    setPreview]    = useState<FilePreview | null>(null);

  const handleDragOver  = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) setPreview(MOCK_FILE_PREVIEW);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setPreview(MOCK_FILE_PREVIEW);
  }, []);

  return (
    <Card>
      <CardContent className="pt-2 space-y-4">
        <div>
          <h2 className="text-sm font-semibold">Upload Email List</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload a CSV or TXT file and we&apos;ll verify every email.
          </p>
        </div>

        {/* Drop zone */}
        <label
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer py-10 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40 hover:bg-muted/30"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input type="file" accept=".csv,.txt" onChange={handleChange} className="sr-only" />
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
            isDragging ? "bg-primary/10" : "bg-muted"
          )}>
            <UploadCloud size={22} className={isDragging ? "text-primary" : "text-muted-foreground"} />
          </div>
          <span className="text-sm font-medium">Drag &amp; drop your file here</span>
          <span className="text-xs text-muted-foreground">CSV or TXT up to 50MB</span>
          <Button
            type="button"
            className="mt-1 gradient-brand border-0 text-white hover:opacity-90"
            onClick={(e) => e.preventDefault()}
          >
            Upload File
          </Button>
        </label>

        <p className="text-xs text-muted-foreground">
          Accepted formats: <span className="font-medium">.csv</span>, <span className="font-medium">.txt</span>
        </p>

        {/* File preview */}
        {preview && (
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-muted-foreground" />
                <span className="text-sm font-medium">{preview.name}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 size={10} />
                  Ready to process
                </span>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Remove file"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-1 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Total Emails</p>
                <p className="text-sm font-semibold tabular-nums">{preview.totalEmails.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duplicates</p>
                <p className="text-sm font-semibold tabular-nums text-amber-600">
                  {preview.duplicates.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    ({((preview.duplicates / preview.totalEmails) * 100).toFixed(1)}%)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Detected Column</p>
                <p className="text-sm font-semibold">{preview.detectedColumn}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
