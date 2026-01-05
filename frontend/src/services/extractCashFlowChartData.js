/**
 * Service to extract and transform Cash Flow data for chart visualization
 * Handles Operating, Investing, and Financing Activities
 */

export function extractCashFlowChartData(data) {
  try {
    const cashFlowData = data?.ReportData?.ComparativeFinancialsStandalone?.CashFlowStatementStandalone;
    
    if (!cashFlowData) {
      console.warn("Cash Flow data not found");
      return [];
    }

    console.log("Cash Flow Statement Data:", cashFlowData);

    const { OperatingActivities, InvestingActivities, FinancingActivities } = cashFlowData;

    // Get all unique years from any of the arrays
    const yearsSet = new Set();
    
    // Collect years from all activity types
    if (OperatingActivities && Array.isArray(OperatingActivities)) {
      OperatingActivities.forEach(item => {
        if (item.FinancialYear) yearsSet.add(item.FinancialYear);
      });
    }

    if (InvestingActivities && Array.isArray(InvestingActivities)) {
      InvestingActivities.forEach(item => {
        if (item.FinancialYear) yearsSet.add(item.FinancialYear);
      });
    }

    if (FinancingActivities && Array.isArray(FinancingActivities)) {
      FinancingActivities.forEach(item => {
        if (item.FinancialYear) yearsSet.add(item.FinancialYear);
      });
    }

    const years = Array.from(yearsSet).sort();

    console.log("Extracted Years:", years);

    // Transform data for chart - convert from full amount to Lacs (divide by 100000)
    const chartData = years.map(year => {
      const yearData = {
        year: year,
        operatingActivities: 0,
        investingActivities: 0,
        financingActivities: 0
      };

      // Get Operating Activities value
      if (OperatingActivities && Array.isArray(OperatingActivities)) {
        const opData = OperatingActivities.find(
          item => item.FinancialYear === year
        );
        if (opData && opData.Amount !== null && opData.Amount !== undefined) {
          // Convert to Lacs (divide by 100000)
          yearData.operatingActivities = parseFloat(opData.Amount) / 100000 || 0;
        }
      }

      // Get Investing Activities value (typically negative, so we keep the sign)
      if (InvestingActivities && Array.isArray(InvestingActivities)) {
        const invData = InvestingActivities.find(
          item => item.FinancialYear === year
        );
        if (invData && invData.Amount !== null && invData.Amount !== undefined) {
          // Convert to Lacs and make negative (since it's cash used)
          yearData.investingActivities = -(parseFloat(invData.Amount) / 100000) || 0;
        }
      }

      // Get Financing Activities value (typically negative, so we keep the sign)
      if (FinancingActivities && Array.isArray(FinancingActivities)) {
        const finData = FinancingActivities.find(
          item => item.FinancialYear === year
        );
        if (finData && finData.Amount !== null && finData.Amount !== undefined) {
          // Convert to Lacs and make negative (since it's cash used)
          yearData.financingActivities = -(parseFloat(finData.Amount) / 100000) || 0;
        }
      }

      return yearData;
    });

    console.log("Extracted Cash Flow Chart Data:", chartData);
    return chartData;

  } catch (error) {
    console.error("Error extracting cash flow chart data:", error);
    return [];
  }
}