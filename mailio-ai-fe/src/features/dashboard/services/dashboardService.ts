/**
 * Service abstraction layer — swap mock data for real API calls here.
 * All functions return promises so API migration is a one-line change.
 */

import type { DashboardData } from "../types";
import { MOCK_STATS } from "../mock/stats";
import { MOCK_ACTIVE_VERIFICATION, MOCK_RECENT_VERIFICATIONS } from "../mock/verifications";
import { MOCK_CHART_DATA, MOCK_CHART_TOTAL } from "../mock/chart";

const SIMULATED_LATENCY_MS = 600;

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function fetchDashboardData(): Promise<DashboardData> {
  await delay(SIMULATED_LATENCY_MS);

  return {
    stats:               MOCK_STATS,
    activeVerification:  MOCK_ACTIVE_VERIFICATION,
    recentVerifications: MOCK_RECENT_VERIFICATIONS,
    chartData:           MOCK_CHART_DATA,
    chartTotal:          MOCK_CHART_TOTAL,
  };
}
