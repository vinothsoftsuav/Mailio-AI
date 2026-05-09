"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ResultsStatsRow } from "./ResultsStatsRow";
import { ResultsFiltersBar } from "./ResultsFiltersBar";
import { ResultsTable } from "./ResultsTable";
import { MOCK_RESULTS } from "../mock";
import type { ResultsFilters } from "../types";

const DEFAULT_FILTERS: ResultsFilters = {
  query:    "",
  status:   "all",
  type:     "all",
  page:     1,
  pageSize: 10,
};

export function ResultsView() {
  const [filters, setFilters] = useState<ResultsFilters>(DEFAULT_FILTERS);

  const patch = (p: Partial<ResultsFilters>) =>
    setFilters((prev) => ({ ...prev, ...p }));

  const filtered = useMemo(() => {
    const q = filters.query.toLowerCase();
    return MOCK_RESULTS.filter((r) => {
      if (q && !r.label.toLowerCase().includes(q)) return false;
      if (filters.status !== "all" && r.status !== filters.status) return false;
      if (filters.type   !== "all" && r.type   !== filters.type)   return false;
      return true;
    });
  }, [filters.query, filters.status, filters.type]);

  const paginated = filtered.slice(
    (filters.page - 1) * filters.pageSize,
    filters.page * filters.pageSize,
  );

  return (
    <div className="space-y-4">
      <ResultsStatsRow />

      <Card>
        <CardContent className="pt-3 space-y-3">
          <ResultsFiltersBar filters={filters} onChange={patch} />
          <ResultsTable
            records={paginated}
            filters={filters}
            total={filtered.length}
            onChange={patch}
          />
        </CardContent>
      </Card>
    </div>
  );
}
