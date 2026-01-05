/**
 * Extract ratio analysis chart data from API response
 * @param {Object} data - Full API response
 * @returns {Object} - Formatted chart data for ratio comparisons
 */
export function extractRatioChartData(data) {
  try {
    const ratioData = data?.ReportData?.ComparativeFinancialsStandalone?.RatioAnalysisStandalone;
    
    if (!ratioData) {
      console.error("RatioAnalysisStandalone data not found");
      return null;
    }

    // Helper function to extract data for a specific metric
    const extractMetric = (metricArray) => {
      if (!Array.isArray(metricArray)) return [];
      return metricArray.map(item => ({
        year: item.FinancialYear || "N/A",
        value: item.Amount || 0
      }));
    };

    // Extract only the 4 required ratio metrics
    const chartData = {
      // Chart 1: Returns Section
      returns: {
        roce: extractMetric(ratioData.ReturnOnCapitalEmployedPercentage_RoCEs),
        roe: extractMetric(ratioData.ReturnOnEquityPercentage_RoEs)
      },
      
      // Chart 2: Liquidity Section
      liquidity: {
        quickRatio: extractMetric(ratioData.QuickRatios),
        currentRatio: extractMetric(ratioData.CurrentRatio)
      },
      
      // Chart 3: Leverage Section
      leverage: {
        leverageTOL: extractMetric(ratioData.LeverageTOL_TNWs),
        netDebtEquity: extractMetric(ratioData.NetDebtEquities)
      },
      
      // Chart 4: Cash Flow Section (if available in your data)
      // You'll need to add these fields to your JSON structure if they exist
      cashFlow: {
        ocfMargin: [], // Operating Cash Flow Margin - needs to be calculated
        freeCashFlowOCF: [] // Free Cash Flow/OCF - needs to be calculated
      }
    };

    return chartData;
  } catch (error) {
    console.error("Error extracting ratio chart data:", error);
    return null;
  }
}