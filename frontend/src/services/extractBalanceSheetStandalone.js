


export function extractBalanceSheetStandalone(apiResponse) {
  const bs =
    apiResponse?.ReportData?.ComparativeFinancialsStandalone
      ?.BalanceSheetStandalone;

  if (!bs) return null;

  // Helper to convert array → { year: value }
  const mapByYear = (arr) => {
    if (!Array.isArray(arr)) return {};
    return arr.reduce((acc, item) => {
      acc[item.FinancialYear] = item.Amount;
      return acc;
    }, {});
  };

  return {
    years: Object.keys(mapByYear(bs.NetWorth)),

    sections: [
      {
        title: "Equity and Liabilities",
        rows: [
          { label: "Net Worth", values: mapByYear(bs.NetWorth) },
          { label: "Borrowings", values: mapByYear(bs.Borrowings) },
          {
            label: "Other Non-Current Liabilities",
            values: mapByYear(bs.OtherNonCurrentLiabilities)
          },
          {
            label: "Current liabilities and provisions",
            values: mapByYear(bs.CurrentLiabilitiesAndProvisions)
          },
          {
            label: "Deferred tax liability/(asset)",
            values: mapByYear(bs.DeferredTaxLiabilityOfAssets)
          },
          {
            label: "Total Equity and Liabilities",
            values: mapByYear(bs.TotalEquityAndLiabilities)
          }
        ]
      },
      {
        title: "Assets",
        rows: [
          { label: "Tangible assets", values: mapByYear(bs.TangibleAssets) },
          {
            label: "Capital WIP and Others",
            values: mapByYear(bs.CapitalWIPAndOthers)
          },
          { label: "Intangible assets", values: mapByYear(bs.IntangibleAssets) },
          { label: "Investments", values: mapByYear(bs.Investments) },
          { label: "Loans and advances", values: mapByYear(bs.LoansAndAdvances) },
          { label: "Inventory", values: mapByYear(bs.Inventories) },
          {
            label: "Trade Receivables",
            values: mapByYear(bs.TradeReceivables)
          },
          {
            label: "Cash and bank balances",
            values: mapByYear(bs.CashAndBankBalances)
          }
        ]
      }
    ]
  };
}
