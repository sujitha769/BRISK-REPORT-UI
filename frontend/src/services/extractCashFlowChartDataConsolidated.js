// src/services/extractCashFlowChartDataConsolidated.js

export const extractCashFlowChartDataConsolidated = (data) => {
  const cfData =
    data?.ReportData?.ComparativeFinancialsConsolidated
      ?.CashFlowStatementConsolidated;

  if (!cfData) return [];

  return cfData.OperatingActivities.map((item, index) => ({
    year: item.FinancialYear,

    // Operating cash flow → plotted as positive
    operatingActivities: item.Amount || 0,

    // Investing cash flow → plotted as NEGATIVE
    investingActivities: -Math.abs(
      cfData.InvestingActivities?.[index]?.Amount || 0
    ),

    // Financing cash flow → plotted as NEGATIVE
    financingActivities: -Math.abs(
      cfData.FinancingActivities?.[index]?.Amount || 0
    )
  }));
};
