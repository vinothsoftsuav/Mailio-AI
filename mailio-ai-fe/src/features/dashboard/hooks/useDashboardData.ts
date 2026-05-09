"use client";

import { useEffect, useState, useCallback } from "react";
import type { DashboardData } from "../types";
import { fetchDashboardData } from "../services/dashboardService";

interface UseDashboardDataResult {
  data:    DashboardData | null;
  loading: boolean;
  error:   string | null;
  refresh: () => void;
}

export function useDashboardData(): UseDashboardDataResult {
  const [data,    setData]    = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}
