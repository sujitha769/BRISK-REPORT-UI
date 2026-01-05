export function extractPLStandalone(apiResponse) {
  const pl =
    apiResponse?.ReportData?.ComparativeFinancialsStandalone
      ?.ProfitAndLossStatement;

  if (!pl) return { years: [], rows: [] };

  // 1️⃣ Collect all years
  const yearSet = new Set();

  Object.values(pl).forEach((arr) => {
    if (Array.isArray(arr)) {
      arr.forEach((item) => yearSet.add(item.FinancialYear));
    }
  });

  const years = Array.from(yearSet).sort();

  // Helper to map year → amount
  const mapByYear = (arr) => {
    const map = {};
    arr?.forEach((i) => {
      map[i.FinancialYear] = i.Amount;
    });
    return map;
  };

  // 2️⃣ Build rows (ORDER MATTERS – same as BRisk UI)
  const rows = [
    { label: "Operating Revenue", values: mapByYear(pl.OperatingRevenues) },
    { label: "Other Income", values: mapByYear(pl.OtherIncomes) },
    { label: "Total Revenue", values: mapByYear(pl.TotalRevenues) },
    { label: "Total Expenses", values: mapByYear(pl.TotalExpenses) },
    { label: "EBDITA", values: mapByYear(pl.EBDITA) },
    { label: "Depreciation", values: mapByYear(pl.Depreciations) },
    { label: "Interest", values: mapByYear(pl.Interests) },
    { label: "PBT", values: mapByYear(pl.PBT) },
    { label: "Tax", values: mapByYear(pl.Taxes) },
    { label: "Other Adjustments", values: mapByYear(pl.OtherAdjustments) },
    { label: "PAT", values: mapByYear(pl.PAT) }
  ];

  return { years, rows };
}
