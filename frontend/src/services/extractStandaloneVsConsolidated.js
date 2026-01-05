/**
 * Service to extract Standalone Vs Consolidated comparison data
 * @param {Object} data - The full report data object
 * @returns {Object} Structured standalone vs consolidated data
 */
export function extractStandaloneVsConsolidated(data) {
  try {
    const comparisonData = 
      data?.ReportData?.StandaloneVsConsolidatedFinancials;

    if (!comparisonData) {
      return null;
    }

    // Extract Total Revenue Analysis
    const totalRevenueAnalysis = 
      comparisonData.ProfitAndLossStatementAnalysis?.TotalRevenueAnalysis || [];

    // Extract Total Expenses from Consolidated and Standalone
    const consolidatedExpenses = 
      data?.ReportData?.ComparativeFinancialsConsolidated?.ProfitAndLossStatement?.TotalExpenses || [];
    
    const standaloneExpenses = 
      data?.ReportData?.ComparativeFinancialsStandalone?.ProfitAndLossStatement?.TotalExpenses || [];

    // Extract PAT Analysis
    const consolidatedPAT = 
      data?.ReportData?.ComparativeFinancialsConsolidated?.ProfitAndLossStatement?.PAT || [];
    
    const standalonePAT = 
      data?.ReportData?.ComparativeFinancialsStandalone?.ProfitAndLossStatement?.PAT || [];

    // Combine Total Revenue and Total Expenses
    const revenueVsExpensesData = totalRevenueAnalysis.map((item, index) => {
      const consExpense = consolidatedExpenses.find(e => e.FinancialYear === item.FinancialYear);
      const stanExpense = standaloneExpenses.find(e => e.FinancialYear === item.FinancialYear);
      
      return {
        FinancialYear: item.FinancialYear,
        StandaloneRevenue: item.Standalone,
        ConsolidatedRevenue: item.Consolidated,
        StandaloneExpense: stanExpense?.Amount || 0,
        ConsolidatedExpense: consExpense?.Amount || 0
      };
    });

    // Combine PAT data
    const patComparisonData = consolidatedPAT.map((item) => {
      const stanPAT = standalonePAT.find(s => s.FinancialYear === item.FinancialYear);
      
      return {
        FinancialYear: item.FinancialYear,
        StandalonePAT: stanPAT?.Amount || 0,
        ConsolidatedPAT: item.Amount
      };
    });

    return {
      revenueVsExpenses: revenueVsExpensesData,
      patComparison: patComparisonData
    };
  } catch (error) {
    console.error("Error extracting Standalone Vs Consolidated data:", error);
    return null;
  }
}