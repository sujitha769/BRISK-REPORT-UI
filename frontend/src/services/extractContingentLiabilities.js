export function extractContingentLiabilities(data) {
  try {
    const contingentData = data?.ReportData?.SchedulesAndDisclosuresFinancialsInfo?.ContingentLiabilitiesAndCommitments;
    
    if (!contingentData || contingentData.length === 0) {
      return null;
    }

    // Get all unique years from the data
    const yearsSet = new Set();
    contingentData.forEach(item => {
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
      const item = contingentData.find(
        d => d.ElementName === elementName && d.FinancialYear === year
      );
      return item ? item.Amount : null;
    };

    // Define all possible element names in the desired order
    const elementNames = [
      "Claims against company not acknowledged as debt",
      "Guarantees",
      "Other money for which company is contingently liable",
      "Total Contingent liabilities",
      "Estimated amount of contracts remaining to be executed",
      "Uncalled liability on shares and other investments partly paid",
      "Other commitments",
      "Total Commitments",
      "Total Contingent liabilities and Commitments"
    ];

    // Build rows data
    const rows = elementNames.map(elementName => {
      const isTotal = 
        elementName === "Total Contingent liabilities" ||
        elementName === "Total Commitments" ||
        elementName === "Total Contingent liabilities and Commitments";
      
      const isBold = isTotal;
      
      const indent = isTotal ? 0 : 1;

      const rowData = {
        elementName,
        indent,
        isBold,
        isTotal
      };

      years.forEach(year => {
        rowData[year] = getAmountForYear(elementName, year);
      });

      return rowData;
    });

    return {
      years,
      data: rows
    };

  } catch (error) {
    console.error("Error extracting Contingent Liabilities data:", error);
    return null;
  }
}