// src/services/extractBalanceSheetConsolidatedTable.js

const EQUITY_LIABILITY_MAP = [
  { key: "NetWorth", label: "Net Worth" },
  { key: "Borrowings", label: "Borrowings" },
  { key: "OtherNonCurrentLiabilities", label: "Other Non-Current Liabilities" },
  { key: "CurrentLiabilitiesAndProvisions", label: "Current liabilities and provisions" },
  { key: "DeferredTaxLiabilityOfAssets", label: "Deferred tax liability/(asset)" },
  { key: "TotalEquityAndLiabilities", label: "Total Equity and Liabilities" }
];

const ASSETS_MAP = [
  { key: "TangibleAssets", label: "Tangible assets" },
  { key: "CapitalWIPAndOthers", label: "Capital WIP and Others" },
  { key: "IntangibleAssets", label: "Intangible assets" },
  { key: "Investments", label: "Investments" },
  { key: "LoansAndAdvances", label: "Loans and advances" },
  { key: "Inventories", label: "Inventory" },
  { key: "TradeReceivables", label: "Trade Receivables" },
  { key: "CashAndBankBalances", label: "Cash and bank balance" },
  { key: "OtherAssets", label: "Other Assets" },
  { key: "TotalAssets", label: "Total Assets" },
  { key: "CurrentLiabilities", label: "Current Liabilities" },
  { key: "CurrentAssets", label: "Current Assets" },
  { key: "WorkingCapitals", label: "Working Capital" }
];

function buildRows(bs, map) {
  return map.map(({ key, label }) => {
    const values = {};
    (bs[key] || []).forEach((item) => {
      values[item.FinancialYear] = item.Amount;
    });
    return { label, values };
  });
}

export function extractBalanceSheetConsolidatedTable(report) {
  const bs =
    report?.ReportData?.ComparativeFinancialsConsolidated
      ?.BalanceSheetConsolidated;

  if (!bs) return null;

  const years =
    bs.NetWorth?.map((y) => y.FinancialYear) || [];

  return {
    years,
    equityAndLiabilities: buildRows(bs, EQUITY_LIABILITY_MAP),
    assets: buildRows(bs, ASSETS_MAP)
  };
}
