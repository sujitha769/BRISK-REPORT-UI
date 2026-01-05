export const extractSubsidiaryFinancials = (data) => {
  try {
    const subsidiaryData = data?.ReportData?.GroupCompaniesAndRelatedPartyInformation?.SubsidiaryFinancialsSnapshot;
    
    if (!subsidiaryData || !Array.isArray(subsidiaryData)) {
      return { rows: [], warnings: [] };
    }

    // Group data by subsidiary and year to avoid duplicates
    const groupedData = {};
    subsidiaryData.forEach(item => {
      const key = `${item.SubsidiaryName}_${item.FinancialYear}`;
      groupedData[key] = item;
    });

    // Convert to array and sort by year (descending) and then by subsidiary name
    const rows = Object.values(groupedData).sort((a, b) => {
      const yearCompare = b.FinancialYear.localeCompare(a.FinancialYear);
      if (yearCompare !== 0) return yearCompare;
      return a.SubsidiaryName.localeCompare(b.SubsidiaryName);
    });

    // Extract warnings/notes (companies with negative reserves or losses)
    const warnings = [];
    const latestYearData = {};
    
    rows.forEach(item => {
      const year = item.FinancialYear;
      if (!latestYearData[item.SubsidiaryName] || year > latestYearData[item.SubsidiaryName].year) {
        latestYearData[item.SubsidiaryName] = { year, data: item };
      }
    });

    Object.values(latestYearData).forEach(({ data: item }) => {
      if (item.PAT < 0 && item.Reserves < 0) {
        warnings.push({
          subsidiary: item.SubsidiaryName,
          loss: Math.abs(item.PAT),
          reserves: item.Reserves,
          message: `Subsidiary ${item.SubsidiaryName} has made a loss of Rs.${Math.abs(item.PAT).toFixed(0)}, with Reserves standing at Rs. ${item.Reserves.toFixed(0)} (negative, including accumulated losses), as per the latest Subsidiary financials snapshot, as disclosed by company.`
        });
      }
    });

    return { rows, warnings };
  } catch (error) {
    console.error('Error extracting subsidiary financials:', error);
    return { rows: [], warnings: [] };
  }
};