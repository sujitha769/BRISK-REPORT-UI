export function extractAssetLiabilityBreakup(apiResponse) {
  const bs =
    apiResponse?.ReportData?.ComparativeFinancialsStandalone
      ?.BalanceSheetStandalone;

  if (!bs) return [];

  const years = bs.NetWorth.map((x) => x.FinancialYear);

  return years.map((year) => {
    const get = (arr) =>
      arr?.find((x) => x.FinancialYear === year)?.Amount || 0;

    return {
      year,

      // Assets
      tangibleAssets: get(bs.TangibleAssets),
      capitalWIP: get(bs.CapitalWIPAndOthers),
      intangibleAssets: get(bs.IntangibleAssets),
      investments: get(bs.Investments),
      loansAndAdvances: get(bs.LoansAndAdvances),
      inventory: get(bs.Inventories),
      tradeReceivables: get(bs.TradeReceivables),
      cashAndBank: get(bs.CashAndBankBalances),
      otherAssets: get(bs.OtherAssets),

      // Liabilities
      netWorth: get(bs.NetWorth),
      borrowings: get(bs.Borrowings),
      otherNonCurrentLiabilities: get(bs.OtherNonCurrentLiabilities),
      currentLiabilities:
        get(bs.CurrentLiabilitiesAndProvisions),
      deferredTax: get(bs.DeferredTaxLiabilityOfAssets)
    };
  });
}
