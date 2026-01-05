export function extractMCACompliance(data) {
  console.log("Full API Data:", data);
  console.log("ReportData:", data?.ReportData);
  console.log("ComplianceAndDelays:", data?.ReportData?.ComplianceAndDelays);
  console.log("MCAAnnualCompliance:", data?.ReportData?.ComplianceAndDelays?.MCAAnnualCompliance);
  
  if (!data?.ReportData?.ComplianceAndDelays?.MCAAnnualCompliance?.Compliances) {
    console.error("MCA Compliance data not found in expected path");
    return null;
  }

  const compliances = data.ReportData.ComplianceAndDelays.MCAAnnualCompliance.Compliances;
  console.log("Compliances array:", compliances);

  // Get all unique financial years across all compliances
  const allYears = new Set();
  compliances.forEach(compliance => {
    compliance.FilingStatus.forEach(filing => {
      allYears.add(filing.FinancialYear);
    });
  });

  // Sort years
  const sortedYears = Array.from(allYears).sort();
  console.log("Sorted Years:", sortedYears);

  // Build the table data
  const tableData = compliances.map(compliance => {
    const row = {
      complianceType: compliance.Compliance,
      statuses: {}
    };

    // Create a map of year to status (take the last occurrence if duplicates exist)
    compliance.FilingStatus.forEach(filing => {
      row.statuses[filing.FinancialYear] = filing.Status;
    });

    return row;
  });

  console.log("Extracted MCA Compliance Data:", { years: sortedYears, rows: tableData });

  return {
    years: sortedYears,
    rows: tableData
  };
}