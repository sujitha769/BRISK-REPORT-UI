/**
 * Service to extract Finance Cost data
 * @param {Object} data - The full report data object
 * @returns {Object} Structured finance cost data with years and values
 */
export function extractFinanceCost(data) {
  try {
    const financeData = 
      data?.ReportData?.SchedulesAndDisclosuresFinancialsInfo?.FinanceCost;

    if (!financeData) {
      return null;
    }

    // Extract Interest on Borrowings
    const interestOnBorrowings = 
      financeData.InterestOnBorrowings || [];

    // Extract Other Finance Related Charges
    const otherFinanceCharges = 
      financeData.OtherFinanceRelatedCharges || [];

    // Extract Total Finance Costs
    const totalFinanceCosts = 
      financeData.TotalFinanceCosts || [];

    return {
      interestOnBorrowings,
      otherFinanceCharges,
      totalFinanceCosts
    };
  } catch (error) {
    console.error("Error extracting Finance Cost:", error);
    return null;
  }
}