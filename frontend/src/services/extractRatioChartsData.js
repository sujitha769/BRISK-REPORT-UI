/**
 * Service to extract Ratio Analysis Chart Data for all comparison charts
 * @param {Object} data - The full report data object
 * @returns {Object} Structured ratio chart data for all 4 charts
 */
export function extractRatioChartsData(data) {
  try {
    const ratioData = 
      data?.ReportData?.ComparativeFinancialsConsolidated?.RatioAnalysisConsolidated;

    if (!ratioData) {
      return null;
    }

    // Chart 1: Return on Capital Employed & Return on Equity
    const returnOnCapitalEmployed = ratioData.ReturnOnCapitalEmployedPercentage_RoCEs || [];
    const returnOnEquity = ratioData.ReturnOnEquityPercentage_RoEs || [];

    // Chart 2: Quick Ratio & Current Ratio
    const quickRatios = ratioData.QuickRatios || [];
    const currentRatio = ratioData.CurrentRatio || [];

    // Chart 3: Leverage (TOL/TNW) & Net debt-equity
    const leverageTOLTNW = ratioData.LeverageTOL_TNWs || [];
    const netDebtEquity = ratioData.NetDebtEquities || [];

    // Chart 4: Operating Cash Margin & Free Cash Flow
    // Note: These might need to be calculated from cash flow data
    const operatingActivities = 
      data?.ReportData?.ComparativeFinancialsConsolidated?.CashFlowStatementConsolidated?.OperatingActivities || [];
    const operatingRevenues = 
      data?.ReportData?.ComparativeFinancialsConsolidated?.ProfitAndLossStatement?.OperatingRevenues || [];
    const investingActivities = 
      data?.ReportData?.ComparativeFinancialsConsolidated?.CashFlowStatementConsolidated?.InvestingActivities || [];

    // Calculate Operating Cash Margin (Operating Activities / Operating Revenues * 100)
    const operatingCashMargin = operatingActivities.map((item, index) => {
      const revenue = operatingRevenues[index]?.Amount || 1;
      return {
        FinancialYear: item.FinancialYear,
        Amount: (item.Amount / revenue) * 100
      };
    });

    // Calculate Free Cash Flow/OCF (Operating Activities - Investing Activities) / Operating Activities * 100
    const freeCashFlowOCF = operatingActivities.map((item, index) => {
      const investing = investingActivities[index]?.Amount || 0;
      const freeCashFlow = item.Amount - investing;
      return {
        FinancialYear: item.FinancialYear,
        Amount: item.Amount !== 0 ? (freeCashFlow / item.Amount) * 100 : 0
      };
    });

    return {
      chart1: {
        returnOnCapitalEmployed,
        returnOnEquity
      },
      chart2: {
        quickRatios,
        currentRatio
      },
      chart3: {
        leverageTOLTNW,
        netDebtEquity
      },
      chart4: {
        operatingCashMargin,
        freeCashFlowOCF
      }
    };
  } catch (error) {
    console.error("Error extracting Ratio Charts Data:", error);
    return null;
  }
}