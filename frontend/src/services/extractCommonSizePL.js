/**
 * Service to extract Common Size Profit & Loss Account Analysis
 * @param {Object} data - The full report data object
 * @returns {Object} Structured common size P&L data
 */
export function extractCommonSizePL(data) {
  try {
    const commonSizeData = 
      data?.ReportData?.StandaloneVsConsolidatedFinancials?.CommonSizeStatementAnalysis?.ProfitAndLossAccountAnalysis;

    if (!commonSizeData) {
      return null;
    }

    // Extract all P&L elements
    const totalRevenue = commonSizeData.TotalRevenue || {};
    const operatingRevenue = commonSizeData.OperatingRevenue || {};
    const otherIncome = commonSizeData.OtherIncome || {};
    const totalExpenses = commonSizeData.TotalExpenses || {};
    const ebdita = commonSizeData.EBDITACSSAnalysis || {};
    const depreciation = commonSizeData.DepreciationCSSAnalysis || {};
    const interest = commonSizeData.InterestCSSAnalysis || {};
    const pbt = commonSizeData.PBTCSSAnalysis || {};
    const tax = commonSizeData.TaxCSSAnalysis || {};
    const otherAdjustments = commonSizeData.OtherAdjustmentsCSSAnalysis || {};
    const pat = commonSizeData.PATCSSAnalysis || {};

    // Structure the data for table display
    return {
      totalRevenue: {
        standalone: totalRevenue.StandaloneValue || 0,
        consolidated: totalRevenue.ConsolidatedValue || 0,
        standalonePercent: totalRevenue.StandalonePercentage || 0,
        consolidatedPercent: totalRevenue.ConsolidatedPercentage || 0
      },
      operatingRevenue: {
        standalone: operatingRevenue.StandaloneValue || 0,
        consolidated: operatingRevenue.ConsolidatedValue || 0,
        standalonePercent: operatingRevenue.StandalonePercentage || 0,
        consolidatedPercent: operatingRevenue.ConsolidatedPercentage || 0
      },
      otherIncome: {
        standalone: otherIncome.StandaloneValue || 0,
        consolidated: otherIncome.ConsolidatedValue || 0,
        standalonePercent: otherIncome.StandalonePercentage || 0,
        consolidatedPercent: otherIncome.ConsolidatedPercentage || 0
      },
      totalExpenses: {
        standalone: totalExpenses.StandaloneValue || 0,
        consolidated: totalExpenses.ConsolidatedValue || 0,
        standalonePercent: totalExpenses.StandalonePercentage || 0,
        consolidatedPercent: totalExpenses.ConsolidatedPercentage || 0
      },
      ebdita: {
        standalone: ebdita.StandaloneValue || 0,
        consolidated: ebdita.ConsolidatedValue || 0,
        standalonePercent: ebdita.StandalonePercentage || 0,
        consolidatedPercent: ebdita.ConsolidatedPercentage || 0
      },
      depreciation: {
        standalone: depreciation.StandaloneValue || 0,
        consolidated: depreciation.ConsolidatedValue || 0,
        standalonePercent: depreciation.StandalonePercentage || 0,
        consolidatedPercent: depreciation.ConsolidatedPercentage || 0
      },
      interest: {
        standalone: interest.StandaloneValue || 0,
        consolidated: interest.ConsolidatedValue || 0,
        standalonePercent: interest.StandalonePercentage || 0,
        consolidatedPercent: interest.ConsolidatedPercentage || 0
      },
      pbt: {
        standalone: pbt.StandaloneValue || 0,
        consolidated: pbt.ConsolidatedValue || 0,
        standalonePercent: pbt.StandalonePercentage || 0,
        consolidatedPercent: pbt.ConsolidatedPercentage || 0
      },
      tax: {
        standalone: tax.StandaloneValue || 0,
        consolidated: tax.ConsolidatedValue || 0,
        standalonePercent: tax.StandalonePercentage || 0,
        consolidatedPercent: tax.ConsolidatedPercentage || 0
      },
      otherAdjustments: {
        standalone: otherAdjustments.StandaloneValue || 0,
        consolidated: otherAdjustments.ConsolidatedValue || 0,
        standalonePercent: otherAdjustments.StandalonePercentage || 0,
        consolidatedPercent: otherAdjustments.ConsolidatedPercentage || 0
      },
      pat: {
        standalone: pat.StandaloneValue || 0,
        consolidated: pat.ConsolidatedValue || 0,
        standalonePercent: pat.StandalonePercentage || 0,
        consolidatedPercent: pat.ConsolidatedPercentage || 0
      }
    };
  } catch (error) {
    console.error("Error extracting Common Size P&L data:", error);
    return null;
  }
}