"use client";

import { useCallback, useState } from "react";
import { UploadCloud, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";
import { UPLOAD_CONFIG } from "../constants";

export function BulkVerifyCard() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver  = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Email Verification</CardTitle>
        <CardDescription>
          Upload a CSV or TXT file and we&apos;ll verify every email.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Drop zone */}
        <label
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer py-8 transition-colors select-none",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40 hover:bg-muted/30"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          aria-label="File drop zone"
        >
          <input
            type="file"
            accept={UPLOAD_CONFIG.acceptedFormats.join(",")}
            onChange={handleFileChange}
            className="sr-only"
          />
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            isDragging ? "bg-primary/10" : "bg-background border border-border"
          )}>
            <UploadCloud size={20} className={cn(isDragging ? "text-primary" : "text-muted-foreground")} />
          </div>

          {file ? (
            <>
              <span className="text-sm font-medium text-primary flex items-center gap-1.5">
                <FileText size={14} /> {file.name}
              </span>
              <span className="text-xs text-muted-foreground">Click to change file</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Drag &amp; drop your file here</span>
              <span className="text-xs text-muted-foreground">
                {UPLOAD_CONFIG.acceptedFormats.join(" or ")} up to {UPLOAD_CONFIG.maxSizeMb}MB
              </span>
            </>
          )}
        </label>

        {/* CTA */}
        <Button
          className="w-full gradient-brand border-0 text-white hover:opacity-90"
          disabled={!file}
        >
          Upload &amp; Verify
        </Button>

        {/* Security note */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck size={12} />
          Your data is secure and never shared.
        </p>
      </CardContent>
    </Card>
  );
}
