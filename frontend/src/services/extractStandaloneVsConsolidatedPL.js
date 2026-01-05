// src/services/extractStandaloneVsConsolidatedPL.js

export const extractStandaloneVsConsolidatedPL = (data) => {
  const pl =
    data?.ReportData?.StandaloneVsConsolidatedFinancials
      ?.ProfitAndLossStatementAnalysis;

  if (!pl) return null;

  const result = {
    // title: "Standalone Vs Consolidated Financials",
    // subtitle:
    //   "Conveys the comparative study of financials between Standalone and its Consolidated counterpart.",
    sections: []
  };

  // Utility to process year-wise comparison arrays
  const processYearlyArray = (label, arr) => {
    if (!Array.isArray(arr)) return;

    const years = arr.map((i) => i.FinancialYear);

    result.years = years;

    result.sections.push({
      sectionName: label,
      rows: [
        {
          name: "Standalone",
          values: arr.map((i) => i.Standalone ?? null)
        },
        {
          name: "Consolidated",
          values: arr.map((i) => i.Consolidated ?? null)
        }
      ]
    });
  };

  processYearlyArray("Total Revenue", pl.TotalRevenueAnalysis);
  processYearlyArray("Total Expenses", pl.TotalExpensesAnalysis);
  processYearlyArray("Profit After Tax", pl.ProfitAfterTaxAnalysis);

  return result;
};
