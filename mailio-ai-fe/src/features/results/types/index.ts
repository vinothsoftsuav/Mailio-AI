export type ResultType   = "single" | "bulk";
export type EmailStatus  = "valid" | "invalid" | "risky" | "disposable";
export type RiskLevel    = "low" | "medium" | "high" | null;

export interface ResultRecord {
  id:           string;
  type:         ResultType;
  label:        string;        // email for single, file name for bulk
  status:       EmailStatus;
  risk:         RiskLevel;
  verifiedAt:   string;
}

export interface ResultsStat {
  id:         string;
  label:      string;
  value:      string;
  change:     number;
  subLabel:   string;
  iconName:   string;
  iconColor:  string;
  iconBgColor: string;
}

export type StatusFilter = "all" | EmailStatus;
export type TypeFilter   = "all" | ResultType;

export interface ResultsFilters {
  query:      string;
  status:     StatusFilter;
  type:       TypeFilter;
  page:       number;
  pageSize:   number;
}
