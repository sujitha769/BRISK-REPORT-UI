// src/services/extractCashFlowConsolidatedTable.js

const CASH_FLOW_MAP = [
  { key: "OperatingActivities", label: "Operating Activities" },
  { key: "InvestingActivities", label: "Investing Activities" },
  { key: "FinancingActivities", label: "Financing Activities" },
  { key: "CashAndCashEquivalentAtEnds", label: "Cash and Cash Equivalent at End" }
];

export function extractCashFlowConsolidatedTable(report) {
  const cf =
    report?.ReportData?.ComparativeFinancialsConsolidated
      ?.CashFlowStatementConsolidated;

  if (!cf) return null;

  // years dynamically
  const years =
    cf.OperatingActivities?.map((y) => y.FinancialYear) || [];

  const rows = CASH_FLOW_MAP.map(({ key, label }) => {
    const values = {};

    (cf[key] || []).forEach((item) => {
      values[item.FinancialYear] = item.Amount;
    });

    return {
      label,
      values
    };
  });

  return {
    years,
    rows
  };
}
