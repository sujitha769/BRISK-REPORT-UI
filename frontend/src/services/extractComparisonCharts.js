/**
 * Service to extract data for comparison charts
 * @param {Object} data - The full report data object
 * @returns {Object} Structured comparison charts data
 */
export function extractComparisonCharts(data) {
  try {
    const standaloneData = 
      data?.ReportData?.ComparativeFinancialsStandalone;
    const consolidatedData = 
      data?.ReportData?.ComparativeFinancialsConsolidated;
    const balanceSheetAnalysis = 
      data?.ReportData?.StandaloneVsConsolidatedFinancials?.BalanceSheetAnalysis;

    if (!standaloneData || !consolidatedData) {
      return null;
    }

    // Chart 1: Return on Networth Vs Long Term Advances to Long Term Borrowing
    
    // Get Return on Networth (ROE) - Standalone
    const standaloneROE = 
      standaloneData.RatioAnalysisStandalone?.ReturnOnEquityPercentage_RoEs || [];
    
    // Get Return on Networth (ROE) - Consolidated
    const consolidatedROE = 
      consolidatedData.RatioAnalysisConsolidated?.ReturnOnEquityPercentage_RoEs || [];

    // Get Long Term Advances - Standalone
    const standaloneLongTermLoans = 
      standaloneData.BalanceSheetStandalone?.LoansAndAdvances || [];
    
    // Get Long Term Borrowings - Standalone
    const standaloneLongTermBorrowings = 
      standaloneData.BalanceSheetStandalone?.Borrowings || [];

    // Get Long Term Advances - Consolidated
    const consolidatedLongTermLoans = 
      consolidatedData.BalanceSheetConsolidated?.LoansAndAdvances || [];
    
    // Get Long Term Borrowings - Consolidated
    const consolidatedLongTermBorrowings = 
      consolidatedData.BalanceSheetConsolidated?.Borrowings || [];

    // Calculate Long Term Advances to Long Term Borrowing ratio
    const standaloneLTRatio = standaloneLongTermLoans.map((loan, index) => {
      const borrowing = standaloneLongTermBorrowings[index]?.Amount || 1;
      return {
        FinancialYear: loan.FinancialYear,
        Amount: (loan.Amount / borrowing) * 100
      };
    });

    const consolidatedLTRatio = consolidatedLongTermLoans.map((loan, index) => {
      const borrowing = consolidatedLongTermBorrowings[index]?.Amount || 1;
      return {
        FinancialYear: loan.FinancialYear,
        Amount: (loan.Amount / borrowing) * 100
      };
    });

    // Chart 2: Current Ratio Vs Return on Debt Equity Ratio
    
    // Get Current Ratio - Standalone
    const standaloneCurrentRatio = 
      standaloneData.RatioAnalysisStandalone?.CurrentRatio || [];
    
    // Get Current Ratio - Consolidated
    const consolidatedCurrentRatio = 
      consolidatedData.RatioAnalysisConsolidated?.CurrentRatio || [];

    // Get Debt Equity Ratio - Standalone
    const standaloneDebtEquity = 
      standaloneData.RatioAnalysisStandalone?.NetDebtEquities || [];
    
    // Get Debt Equity Ratio - Consolidated
    const consolidatedDebtEquity = 
      consolidatedData.RatioAnalysisConsolidated?.NetDebtEquities || [];

    return {
      chart1: {
        standaloneROE,
        consolidatedROE,
        standaloneLTRatio,
        consolidatedLTRatio
      },
      chart2: {
        standaloneCurrentRatio,
        consolidatedCurrentRatio,
        standaloneDebtEquity,
        consolidatedDebtEquity
      }
    };
  } catch (error) {
    console.error("Error extracting Comparison Charts data:", error);
    return null;
  }
}