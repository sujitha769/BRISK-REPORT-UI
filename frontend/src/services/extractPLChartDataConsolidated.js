// ============================================

export const extractPLChartDataConsolidated = (data) => {
  const plData = data?.ReportData?.ComparativeFinancialsConsolidated?.ProfitAndLossStatement;
  if (!plData) return [];

  const years = plData.OperatingRevenues.map(item => item.FinancialYear);
  
  return years.map((year, index) => ({
    year: year,
    operatingRevenue: plData.OperatingRevenues[index].Amount,
    ebdita: plData.EBDITA[index].Amount,
    pat: plData.PAT[index].Amount
  }));
};