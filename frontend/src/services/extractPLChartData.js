export function extractPLChartData(apiResponse) {
  const pl =
    apiResponse?.ReportData?.ComparativeFinancialsStandalone
      ?.ProfitAndLossStatement;

  if (!pl) return [];

  const years = pl.OperatingRevenues.map((item) => item.FinancialYear);

  return years.map((year) => {
    const getAmount = (arr) =>
      arr?.find((i) => i.FinancialYear === year)?.Amount ?? 0;

    return {
      year,
      operatingRevenue: getAmount(pl.OperatingRevenues) / 100000,
      ebdita: getAmount(pl.EBDITA) / 100000,
      pat: getAmount(pl.PAT) / 100000
    };
  });
}
