/**
 * Service to extract Personal Guarantee data
 */

export function extractPersonalGuarantee(data) {
  try {
    const guaranteeData = data?.ReportData?.ChargesProfileReport?.PersonalGuarantees;
    
    console.log("Personal Guarantee Raw Data:", guaranteeData);

    // If guaranteeData is null or empty array, return empty structure
    if (!guaranteeData || (Array.isArray(guaranteeData) && guaranteeData.length === 0)) {
      return {
        hasData: false,
        guarantees: []
      };
    }

    // If guaranteeData is an array with data
    if (Array.isArray(guaranteeData)) {
      const transformedGuarantees = guaranteeData.map(guarantee => ({
        chargeHolder: guarantee.ChargeHolder || "",
        chargeID: guarantee.ChargeID || "",
        amount: guarantee.Amount || 0,
        outstandingYears: guarantee.OutstandingYears || "",
        assetsSecured: guarantee.AssetsSecured || "",
        personalGuarantee: guarantee.PersonalGuarantee || ""
      }));

      return {
        hasData: true,
        guarantees: transformedGuarantees
      };
    }

    // If guaranteeData is null or other value
    return {
      hasData: false,
      guarantees: []
    };

  } catch (error) {
    console.error("Error extracting personal guarantee data:", error);
    return {
      hasData: false,
      guarantees: []
    };
  }
}