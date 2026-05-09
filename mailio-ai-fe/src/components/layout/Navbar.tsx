"use client";

import { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Plus, Star, LogOut, User, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils";
import { USAGE_INFO } from "@/src/features/dashboard/constants";
import { MobileMenuButton } from "./Sidebar";
import { NotificationDropdown } from "./NotificationDropdown";
import { SearchBar } from "./SearchBar";

// ── Usage pill ─────────────────────────────────────────────────────────────

const UsagePill = memo(() => {
  const { used, total } = USAGE_INFO;
  const pct = Math.round((used / total) * 100);

  return (
    <div className="hidden md:flex items-center gap-2.5 rounded-full border border-border bg-card px-3 py-1.5">
      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full gradient-usage transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium whitespace-nowrap">
        {used.toLocaleString()} / {total.toLocaleString()}
        <span className="text-muted-foreground"> verifications</span>
      </span>
    </div>
  );
});
UsagePill.displayName = "UsagePill";

// ── Avatar dropdown ────────────────────────────────────────────────────────

function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSignOut() {
    setOpen(false);
    router.push("/login");
  }

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="gap-1.5 px-2"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md gradient-brand text-white text-[10px] font-bold select-none">
          TK
        </div>
        <ChevronDown size={13} className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-border bg-card py-1 shadow-lg z-50">
          <div className="px-3 py-2 border-b border-border">
            <p className="text-xs font-semibold">Tom Kristenson</p>
            <p className="text-xs text-muted-foreground truncate">tom@company.com</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-xs hover:bg-muted transition-colors"
          >
            <User size={13} className="text-muted-foreground" /> Profile
          </Link>

          <button className="flex w-full items-center gap-2.5 px-3 py-2 text-xs hover:bg-muted transition-colors">
            <HelpCircle size={13} className="text-muted-foreground" /> Help & Support
          </button>

          <div className="border-t border-border mt-1">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <MobileMenuButton onClick={onMenuClick} />
        <SearchBar />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Plan badge */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1">
          <Star size={11} className="text-amber-500 fill-amber-400" />
          <span className="text-xs font-semibold text-amber-700">{USAGE_INFO.plan}</span>
        </div>

        <UsagePill />

        {/* Start Verification CTA */}
        <Button
          size="sm"
          className="gradient-brand border-0 text-white hover:opacity-90 gap-1.5"
          onClick={() => router.push("/single-verify")}
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Start Verification</span>
        </Button>

        <NotificationDropdown />
        <AvatarDropdown />
      </div>
    </header>
  );
}
