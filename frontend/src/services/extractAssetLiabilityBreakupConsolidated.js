// ============================================
// FILE: src/services/extractAssetLiabilityBreakupConsolidated.js
// ============================================

export const extractAssetLiabilityBreakupConsolidated = (data) => {
  const bsData = data?.ReportData?.ComparativeFinancialsConsolidated?.BalanceSheetConsolidated;
  if (!bsData) return [];

  const years = bsData.NetWorth.map(item => item.FinancialYear);
  
  return years.map((year, index) => ({
    year: year,
    // Assets (Blue shades)
    tangibleAssets: bsData.TangibleAssets[index].Amount,
    investments: bsData.Investments[index].Amount,
    loansAndAdvances: bsData.LoansAndAdvances[index].Amount,
    inventory: bsData.Inventories[index].Amount,
    tradeReceivables: bsData.TradeReceivables[index].Amount,
    cashAndBank: bsData.CashAndBankBalances[index].Amount,
    otherAssets: bsData.IntangibleAssets[index].Amount + bsData.CapitalWIPAndOthers[index].Amount + bsData.OtherAssets[index].Amount,
    // Liabilities (Green shades)
    netWorth: bsData.NetWorth[index].Amount,
    borrowings: bsData.Borrowings[index].Amount,
    otherNonCurrentLiabilities: bsData.OtherNonCurrentLiabilities[index].Amount,
    currentLiabilities: bsData.CurrentLiabilitiesAndProvisions[index].Amount,
    deferredTax: bsData.DeferredTaxLiabilityOfAssets[index].Amount
  }));
};

