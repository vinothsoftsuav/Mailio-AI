"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, FileText, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Notification {
  id:        string;
  type:      "success" | "warning" | "info";
  title:     string;
  body:      string;
  time:      string;
  read:      boolean;
}

const INITIAL: Notification[] = [
  { id: "1", type: "success", title: "Bulk job complete",       body: "Spring Outreach List.csv — 9,126 emails verified.",        time: "2m ago",   read: false },
  { id: "2", type: "warning", title: "Quota at 80%",            body: "You've used 8,240 of 10,000 verifications this month.",    time: "1h ago",   read: false },
  { id: "3", type: "success", title: "Bulk job complete",       body: "CMO Leads May.csv — 5,000 emails verified.",              time: "3h ago",   read: false },
  { id: "4", type: "info",    title: "Payment processed",       body: "Your Pro Plan invoice of $49.00 was paid successfully.",  time: "Yesterday", read: true  },
  { id: "5", type: "info",    title: "Welcome to Mailio.ai",    body: "Start verifying emails with Single or Bulk Verify.",      time: "Jan 12",    read: true  },
];

const TYPE_CONFIG = {
  success: { Icon: FileText,       iconClass: "text-emerald-600", bgClass: "bg-emerald-50" },
  warning: { Icon: AlertTriangle,  iconClass: "text-amber-600",   bgClass: "bg-amber-50"   },
  info:    { Icon: Info,           iconClass: "text-blue-600",    bgClass: "bg-blue-50"    },
};

export function NotificationDropdown() {
  const [open,  setOpen]  = useState(false);
  const [items, setItems] = useState<Notification[]>(INITIAL);
  const ref = useRef<HTMLDivElement>(null);

  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted",
          open && "bg-muted"
        )}
      >
        <Bell size={16} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-80 rounded-xl border border-border bg-card shadow-lg z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-sm font-semibold">Notifications</span>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              >
                <CheckCheck size={12} /> Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <ul className="max-h-80 overflow-y-auto divide-y divide-border">
            {items.map((n) => {
              const { Icon, iconClass, bgClass } = TYPE_CONFIG[n.type];
              return (
                <li
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={cn(
                    "flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-muted/40",
                    !n.read && "bg-primary/[0.03]"
                  )}
                >
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-0.5", bgClass)}>
                    <Icon size={14} className={iconClass} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn("text-xs font-semibold leading-snug", !n.read && "text-foreground")}>{n.title}</p>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{n.body}</p>
                  </div>
                  {!n.read && (
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2.5">
            <button className="text-xs text-primary font-medium hover:underline w-full text-center">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
