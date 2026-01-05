export function extractCommonSizeBalanceSheet(data) {
  const bs =
    data?.ReportData?.StandaloneVsConsolidatedFinancials
      ?.CommonSizeStatementAnalysis
      ?.BalanceSheetAnalysis;

  if (!bs) return null;

  const rowMap = [
    ["TotalEquityAndLiabilitiesCSSAnalysis", "Total Equity and Liabilities"],
    ["NetWorthCSSAnalysis", "Net Worth"],
    ["BorrowingsCSSAnalysis", "Borrowings"],
    ["OtherNonCurrentLiabilitiesCSSAnalysis", "Other Non-Current Liabilities"],
    ["CurrentLiabilitiesAndProvisionsCSSAnalysis", "Current liabilities and provisions"],
    ["DeferredTaxLiabilityOfAssetCSSAnalysis", "Deferred tax liability/(asset)"],
    ["TotalAssetsCSSAnalysis", "Total Assets"],
    ["TangibleAssetsCSSAnalysis", "Tangible assets"],
    ["CapitalWIPAndOthersCSSAnalysis", "Capital WIP and Others"],
    ["IntangibleAssetsCSSAnalysis", "Intangible assets"],
    ["InvestmentsCSSAnalysis", "Investments"],
    ["LoansAndAdvancesCSSAnalysis", "Loans and advances"],
    ["InventoriesCSSAnalysis", "Inventory"],
    ["TradeReceivablesCSSAnalysis", "Trade Receivables"],
    ["CashAndBankBalancesCSSAnalysis", "Cash and bank balance"],
    ["OtherAssetsCSSAnalysis", "Other Assets"]
  ];

  const rows = rowMap
    .filter(([key]) => bs[key])
    .map(([key, label]) => {
      const r = bs[key];
      return {
        label,
        standaloneValue: r.StandaloneValue,
        consolidatedValue: r.ConsolidatedValue,
        standalonePct: r.StandalonePercentage,
        consolidatedPct: r.ConsolidatedPercentage
      };
    });

  return rows;
}
