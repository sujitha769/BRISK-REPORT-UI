// src/services/extractRatioRedFlags.js

export function extractRatioRedFlags(report) {
  const flags = report?.ReportData?.RiskReport?.RedFlags;

  if (!Array.isArray(flags)) return [];

  return flags.map((flag, index) => ({
    id: index,
    ratio: flag.RatioName,
    year: flag.FinancialYear,
    actual: flag.ActualValue,
    benchmark: flag.BenchmarkValue,
    description: flag.Description
  }));
}
