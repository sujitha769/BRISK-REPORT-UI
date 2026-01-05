/**
 * Extract GST Compliance data from API response
 * @param {Object} data - Full API response
 * @returns {Array} - Formatted GST compliance data with dynamic months
 */
export function extractGSTCompliance(data) {
  try {
    const gstData = data?.ReportData?.ComplianceAndDelays?.GSTComplianceLatestSixMonths;
    
    if (!gstData || !Array.isArray(gstData)) {
      console.error("GSTComplianceLatestSixMonths data not found");
      return [];
    }

    // Extract unique months from the first entry (all entries should have same months)
    const months = gstData[0]?.FilingDetail?.map(detail => detail.FilingMonth) || [];

    // Transform the data for table display
    const formattedData = gstData.map(entry => {
      const row = {
        gstin: entry.GSTIN || "NA",
        state: entry.State || "NA",
        filingStatuses: {}
      };

      // Map each month to its filing status
      if (Array.isArray(entry.FilingDetail)) {
        entry.FilingDetail.forEach(detail => {
          row.filingStatuses[detail.FilingMonth] = detail.FilingStatus || "Not Available";
        });
      }

      return row;
    });

    return {
      months,
      data: formattedData
    };
  } catch (error) {
    console.error("Error extracting GST compliance data:", error);
    return {
      months: [],
      data: []
    };
  }
}