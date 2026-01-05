/**
 * Service to extract Revenue from Operations data
 * @param {Object} data - The full report data object
 * @returns {Object} Structured revenue data with years and values
 */
export function extractRevenueFromOperations(data) {
  try {
    const revenueData = 
      data?.ReportData?.SchedulesAndDisclosuresFinancialsInfo?.RevenueFromOperations;

    if (!revenueData) {
      return null;
    }

    // Extract Domestic Sales - Manufactured Goods
    const domesticManufactured = 
      revenueData.DomesticTurnover?.DomesticSalesOfManufacturedGoods || [];

    // Extract Domestic Sales - Traded Goods
    const domesticTraded = 
      revenueData.DomesticTurnover?.DomesticSalesOfTradedGoods || [];

    // Extract Domestic Sales - Services
    const domesticServices = 
      revenueData.DomesticTurnover?.DomesticSalesOfServices || [];

    // Extract Export Sales - Manufactured Goods
    const exportManufactured = 
      revenueData.ExportTurnover?.ExportSalesOfManufacturedGoods || [];

    // Extract Export Sales - Traded Goods
    const exportTraded = 
      revenueData.ExportTurnover?.ExportSalesOfTradedGoods || [];

    // Extract Export Sales - Services
    const exportServices = 
      revenueData.ExportTurnover?.ExportSalesOfServices || [];

    // Extract Total Revenue
    const totalRevenue = 
      revenueData.TotalRevenueFromOperations || [];

    return {
      domesticManufactured,
      domesticTraded,
      domesticServices,
      exportManufactured,
      exportTraded,
      exportServices,
      totalRevenue
    };
  } catch (error) {
    console.error("Error extracting Revenue from Operations:", error);
    return null;
  }
}