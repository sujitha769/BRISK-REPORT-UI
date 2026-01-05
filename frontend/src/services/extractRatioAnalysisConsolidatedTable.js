// src/services/extractRatioAnalysisConsolidatedTable.js

const RATIO_SECTIONS = [
  {
    title: "Growth ratios",
    items: [
      { key: "OperativeRevenueGrowthPercentages", label: "Operative Revenue growth (%)" },
      { key: "EBITDAGrowths", label: "EBITDA growth (%)" },
      { key: "EPSGrowths", label: "EPS growth (%)" }
    ]
  },
  {
    title: "Profitability Ratios",
    items: [
      { key: "EBITDAMarginPercentages", label: "EBITDA margin (%)" },
      { key: "PATMarginPercentage", label: "PAT margin (%)" },
      { key: "ReturnOnCapitalEmployedPercentage_RoCEs", label: "Return on capital employed (RoCE) (%)" },
      { key: "ReturnOnEquityPercentage_RoEs", label: "Return on equity (RoE) (%)" },
      { key: "ReturnOnAssetsPercentage_RoAs", label: "Return on Assets (RoA) (%)" }
    ]
  },
  {
    title: "Working Capital Ratios",
    items: [
      { key: "AvgInventoryHoldingDays", label: "Avg. Inventory holding Days" },
      { key: "AvgDebtorsOutstandingDays", label: "Avg. Debtors Outstanding days" },
      { key: "AvgTradePayableDays", label: "Avg. Trade Payable Days" },
      { key: "AvgCashConversionCycle", label: "Avg. Cash Conversion Cycle" }
    ]
  },
  {
    title: "Liquidity and Leverage Ratios",
    items: [
      { key: "QuickRatios", label: "Quick Ratio" },
      { key: "CurrentRatio", label: "Current ratio" },
      { key: "LeverageTOL_TNWs", label: "Leverage (TOL/TNW)" },
      { key: "NetDebtEquities", label: "Net debt-equity" },
      { key: "InterestCoverages", label: "Interest coverage" }
    ]
  },
  {
    title: "Efficiency Ratios",
    items: [
      { key: "CapitalEmployedTurnovers", label: "Capital Employed Turnover" },
      { key: "AssetTurnovers", label: "Asset Turnover" },
      { key: "InventoryTurnovers", label: "Inventory Turnover" },
      { key: "ReceivablesTurnovers", label: "Trade Receivables Turnover" },
      { key: "WorkingCapitalTurnovers", label: "Working Capital Turnover" }
    ]
  }
];

function extractValues(data, key) {
  const values = {};
  (data[key] || []).forEach((item) => {
    values[item.FinancialYear] = item.Amount;
  });
  return values;
}

export function extractRatioAnalysisConsolidatedTable(report) {
  const ratios =
    report?.ReportData?.ComparativeFinancialsConsolidated
      ?.RatioAnalysisConsolidated;

  if (!ratios) return null;

  const years =
    ratios.OperativeRevenueGrowthPercentages?.map(
      (y) => y.FinancialYear
    ) || [];

  const sections = RATIO_SECTIONS.map((section) => ({
    title: section.title,
    rows: section.items.map((item) => ({
      label: item.label,
      values: extractValues(ratios, item.key)
    }))
  }));

  return { years, sections };
}
