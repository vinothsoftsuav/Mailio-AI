import type { VerificationResult, RecentVerification, SingleVerifyStat } from "../types";

export const MOCK_VERIFICATION_RESULT: VerificationResult = {
  email:       "name@company.com",
  status:      "valid",
  confidence:  "High",
  description: "Mailbox exists and accepts email.",
  verifiedAt:  "May 7, 2026 at 10:24 AM",
  durationMs:  1200,
  checks: [
    { key: "syntax",     label: "Syntax",     value: "Valid",        status: "pass",    iconName: "CheckCircle2" },
    { key: "domain",     label: "Domain",     value: "Valid",        status: "pass",    iconName: "Globe"        },
    { key: "mx-record",  label: "MX Record",  value: "Found",        status: "pass",    iconName: "CheckCircle2" },
    { key: "mailbox",    label: "Mailbox",    value: "Accepts Mail", status: "pass",    iconName: "Mail"         },
    { key: "disposable", label: "Disposable", value: "No",           status: "fail",    iconName: "XCircle"      },
    { key: "catch-all",  label: "Catch-all",  value: "No",           status: "pass",    iconName: "CheckCircle2" },
  ],
};

export const MOCK_RECENT_VERIFICATIONS: RecentVerification[] = [
  { id: "1", email: "name@company.com",     status: "valid",      risk: "low",  verifiedAt: "May 7, 2026, 10:24 AM" },
  { id: "2", email: "hello@startup.io",     status: "valid",      risk: "low",  verifiedAt: "May 7, 2026, 10:22 AM" },
  { id: "3", email: "team@business.co",     status: "invalid",    risk: "high", verifiedAt: "May 7, 2026, 10:20 AM" },
  { id: "4", email: "info@tempmail.com",    status: "disposable", risk: "high", verifiedAt: "May 7, 2026, 10:18 AM" },
  { id: "5", email: "support@agency.net",   status: "valid",      risk: "low",  verifiedAt: "May 7, 2026, 10:15 AM" },
];

export const MOCK_SINGLE_VERIFY_STATS: SingleVerifyStat[] = [
  {
    id:           "today-count",
    label:        "Today's Single Verifications",
    value:        "284",
    change:       18.6,
    changePeriod: "vs yesterday",
    iconName:     "Mail",
    iconColor:    "text-blue-600",
    iconBgColor:  "bg-blue-50",
  },
  {
    id:           "success-rate",
    label:        "Success Rate",
    value:        "94.2%",
    change:       2.7,
    changePeriod: "vs yesterday",
    iconName:     "BarChart3",
    iconColor:    "text-emerald-600",
    iconBgColor:  "bg-emerald-50",
  },
  {
    id:           "avg-response",
    label:        "Avg. Response Time",
    value:        "1.4s",
    change:       -0.3,
    changePeriod: "vs yesterday",
    iconName:     "Clock",
    iconColor:    "text-amber-600",
    iconBgColor:  "bg-amber-50",
  },
];
