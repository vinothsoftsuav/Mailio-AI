import type { ResultRecord, ResultsStat } from "../types";

export const MOCK_RESULTS_STATS: ResultsStat[] = [
  { id: "total",      label: "Total Verified",  value: "127,790", change:  18.6, subLabel: "+18.6% vs last week", iconName: "Mail",         iconColor: "text-blue-600",    iconBgColor: "bg-blue-50"    },
  { id: "valid",      label: "Valid",            value: "113,260", change:   2.7, subLabel: "88.6% of total",     iconName: "ShieldCheck",  iconColor: "text-emerald-600", iconBgColor: "bg-emerald-50" },
  { id: "invalid",    label: "Invalid",          value: "7,314",   change:  -6.3, subLabel: "5.7% of total",      iconName: "XCircle",      iconColor: "text-red-500",     iconBgColor: "bg-red-50"     },
  { id: "risky",      label: "Risky",            value: "7,216",   change:   1.2, subLabel: "5.6% of total",      iconName: "AlertTriangle",iconColor: "text-amber-600",   iconBgColor: "bg-amber-50"   },
];

export const MOCK_RESULTS: ResultRecord[] = [
  { id:  "1", type: "single", label: "name@company.com",           status: "valid",      risk: "low",    verifiedAt: "May 9, 2026, 10:24 AM" },
  { id:  "2", type: "bulk",   label: "Spring Outreach List.csv",   status: "valid",      risk: null,     verifiedAt: "May 9, 2026, 10:20 AM" },
  { id:  "3", type: "single", label: "hello@startup.io",           status: "valid",      risk: "low",    verifiedAt: "May 9, 2026, 10:18 AM" },
  { id:  "4", type: "single", label: "team@business.co",           status: "invalid",    risk: "high",   verifiedAt: "May 9, 2026, 10:15 AM" },
  { id:  "5", type: "bulk",   label: "CMO Leads May.csv",          status: "valid",      risk: null,     verifiedAt: "May 8, 2026, 2:38 PM"  },
  { id:  "6", type: "single", label: "info@tempmail.com",          status: "disposable", risk: "high",   verifiedAt: "May 8, 2026, 2:12 PM"  },
  { id:  "7", type: "bulk",   label: "Newsletter Signups.csv",     status: "valid",      risk: null,     verifiedAt: "May 7, 2026, 9:22 AM"  },
  { id:  "8", type: "single", label: "support@agency.net",         status: "valid",      risk: "low",    verifiedAt: "May 7, 2026, 9:18 AM"  },
  { id:  "9", type: "single", label: "noreply@spamsite.org",       status: "risky",      risk: "medium", verifiedAt: "May 7, 2026, 9:05 AM"  },
  { id: "10", type: "bulk",   label: "Webinar Registrations.txt",  status: "valid",      risk: null,     verifiedAt: "May 6, 2026, 4:50 PM"  },
  { id: "11", type: "single", label: "ceo@enterprise.com",         status: "valid",      risk: "low",    verifiedAt: "May 6, 2026, 4:30 PM"  },
  { id: "12", type: "single", label: "user@catchall.io",           status: "risky",      risk: "medium", verifiedAt: "May 6, 2026, 4:15 PM"  },
];
