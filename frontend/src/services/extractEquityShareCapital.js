export function extractEquityShareCapital(data) {
  try {
    const equityData = data?.ReportData?.SchedulesAndDisclosuresFinancialsInfo?.EquityShareCapitalReconciliation;
    
    if (!equityData || equityData.length === 0) {
      return null;
    }

    // Get all unique years from the data
    const yearsSet = new Set();
    equityData.forEach(item => {
      if (item.FinancialYear) {
        yearsSet.add(item.FinancialYear);
      }
    });
    const years = Array.from(yearsSet).sort();

    if (years.length === 0) {
      return null;
    }

    // Helper function to get amount for a specific year and element
    const getAmountForYear = (elementName, year) => {
      const item = equityData.find(
        d => d.ElementName === elementName && d.FinancialYear === year
      );
      return item ? item.Amount : null;
    };

    // Define all possible element names in the desired order
    const elementNames = [
      "Equity - Increase in Share Capital",
      "Equity - Public Issue",
      "Equity - Bonus & Right Issue",
      "Equity - Private Placement",
      "Equity - Others increase",
      "Equity - Decrease in Share Capital",
      "Equity - Bought back",
      "Equity - Others decrease",
      "Equity Share Capital at the end of the period"
    ];

    // Build rows data
    const rows = elementNames.map(elementName => {
      const isHeader = 
        elementName === "Equity - Increase in Share Capital" ||
        elementName === "Equity - Decrease in Share Capital";
      
      const isTotal = elementName === "Equity Share Capital at the end of the period";
      
      const isBold = isTotal;
      
      const indent = isHeader ? 0 : 1;

      const rowData = {
        elementName,
        indent,
        isBold,
        isHeader,
        isTotal
      };

      years.forEach(year => {
        if (isHeader) {
          rowData[year] = null;
        } else {
          rowData[year] = getAmountForYear(elementName, year);
        }
      });

      return rowData;
    });

    return {
      years,
      data: rows
    };

  } catch (error) {
    console.error("Error extracting Equity Share Capital data:", error);
    return null;
  }
}