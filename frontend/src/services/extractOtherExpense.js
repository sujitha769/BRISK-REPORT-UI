/**
 * Service to extract Other Expense data
 * @param {Object} data - The full report data object
 * @returns {Object} Structured other expense data with years and values
 */
export function extractOtherExpense(data) {
  try {
    const otherExpenseData = 
      data?.ReportData?.SchedulesAndDisclosuresFinancialsInfo?.OtherExpense;

    if (!otherExpenseData) {
      return null;
    }

    // Extract all expense categories
    const consumptionOfStoresAndSpareParts = 
      otherExpenseData.ConsumptionOfStoresAndSpareParts || [];

    const powerAndFuels = 
      otherExpenseData.PowerAndFuels || [];

    const rents = 
      otherExpenseData.Rents || [];

    const repairsToBuildingAndMachineries = 
      otherExpenseData.RepairsToBuildingAndMachineries || [];

    const travellingConveyances = 
      otherExpenseData.TravellingConveyances || [];

    const ratesAndTaxes = 
      otherExpenseData.RatesAndTaxes || [];

    const legalProfessionalCharges = 
      otherExpenseData.LegalProfessionalCharges || [];

    const advertisingPromotionals = 
      otherExpenseData.AdvertisingPromotionals || [];

    const paymentsToAuditors = 
      otherExpenseData.PaymentsToAuditors || [];

    const miscellaneousExpenses = 
      otherExpenseData.MiscellaneousExpenses || [];

    const totalOtherExpenses = 
      otherExpenseData.TotalOtherExpenses || [];

    return {
      consumptionOfStoresAndSpareParts,
      powerAndFuels,
      rents,
      repairsToBuildingAndMachineries,
      travellingConveyances,
      ratesAndTaxes,
      legalProfessionalCharges,
      advertisingPromotionals,
      paymentsToAuditors,
      miscellaneousExpenses,
      totalOtherExpenses
    };
  } catch (error) {
    console.error("Error extracting Other Expense:", error);
    return null;
  }
}