// services/extractStandaloneVsConsolidatedBalanceSheet.js

export const extractStandaloneVsConsolidatedBalanceSheet = (data) => {
  const bs =
    data?.ReportData?.StandaloneVsConsolidatedFinancials?.BalanceSheetAnalysis;

  if (!bs || typeof bs !== "object") return [];

  const sections = [];

  const map = [
    { key: "NetWorthAnalysis", label: "Net Worth" },
    { key: "ReturnOnNetworthAnalysis", label: "Return on Networth" },
    {
      key: "LongTermAdvancesToLongTermBorrowingAnalysis",
      label: "Long Term Advances to Long Term Borrowing"
    },
    { key: "CurrentRatioAnalysis", label: "Current Ratio" },
    { key: "DebtEquityRatioAnalysis", label: "Debt Equity Ratio" }
  ];

  map.forEach(({ key, label }) => {
    const arr = bs[key];
    if (Array.isArray(arr) && arr.length > 0) {
      sections.push({
        label,
        rows: arr
      });
    }
  });

  return sections;
};
