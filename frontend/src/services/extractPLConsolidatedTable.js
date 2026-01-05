// src/services/extractPLConsolidatedTable.js

const ELEMENT_MAP = [
  { key: "OperatingRevenues", label: "Operating Revenue" },
  { key: "OtherIncomes", label: "Other Income" },
  { key: "TotalRevenues", label: "Total Revenue" },
  { key: "TotalExpenses", label: "Total Expenses" },
  { key: "EBDITA", label: "EBDITA" },
  { key: "Depreciations", label: "Depreciation" },
  { key: "Interests", label: "Interest" },
  { key: "PBT", label: "PBT" },
  { key: "Taxes", label: "Tax" },
  { key: "OtherAdjustments", label: "Other Adjustments" },
  { key: "PAT", label: "PAT" }
];

export function extractPLConsolidatedTable(report) {
  const pl =
    report?.ReportData?.ComparativeFinancialsConsolidated
      ?.ProfitAndLossStatement;

  if (!pl) return null;

  // Get years dynamically
  const years =
    pl.OperatingRevenues?.map((y) => y.FinancialYear) || [];

  // Build rows
  const rows = ELEMENT_MAP.map(({ key, label }) => {
    const yearValues = {};

    (pl[key] || []).forEach((item) => {
      yearValues[item.FinancialYear] =
        item.Amount !== null ? item.Amount : 0;
    });

    return {
      element: label,
      values: yearValues
    };
  });

  return {
    years,
    rows
  };
}
