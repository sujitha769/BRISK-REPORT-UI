export function extractEstablishmentAndEPF(data) {
  console.log("Full API Data:", data);
  console.log("ReportData:", data?.ReportData);
  console.log("EstablishmentAndEPFDetails:", data?.ReportData?.EstablishmentAndEPFDetails);
  
  if (!data?.ReportData?.EstablishmentAndEPFDetails) {
    console.error("Establishment and EPF data not found in expected path");
    return null;
  }

  const epfData = data.ReportData.EstablishmentAndEPFDetails;
  
  return {
    establishments: epfData.EstablishmentDetails || [],
    employmentTrends: epfData.EmploymentTrends || []
  };
}