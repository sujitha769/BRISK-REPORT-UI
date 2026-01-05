export function extractChargeSearchReport(data) {
  console.log("Full API Data:", data);
  console.log("ReportData:", data?.ReportData);
  console.log("ChargeSearchReport:", data?.ReportData?.ChargeSearchReport);
  
  if (!data?.ReportData?.ChargeSearchReport) {
    console.error("Charge Search Report data not found in expected path");
    return null;
  }

  const chargeReport = data.ReportData.ChargeSearchReport;
  
  // Filter out total/sum rows and process charges
  const processCharges = (charges) => {
    if (!charges || charges.length === 0) return { charges: [], totals: [] };
    
    const processedCharges = [];
    const totalRows = [];
    
    charges.forEach(charge => {
      // Identify total rows
      if (charge.ChargeHolder && 
          (charge.ChargeHolder.includes('Total Charge') || 
           charge.ChargeHolder.includes('Sum of all Charges'))) {
        totalRows.push(charge);
      } else {
        processedCharges.push(charge);
      }
    });
    
    return { charges: processedCharges, totals: totalRows };
  };

  const openCharges = processCharges(chargeReport.OpenCharges);
  const satisfiedCharges = processCharges(chargeReport.SatisfiedCharges);

  // Find charges outstanding for more than 10 years
  const longOutstandingCharges = openCharges.charges.filter(
    charge => charge.OutstandingYears && charge.OutstandingYears > 10
  );

  console.log("Extracted Charge Search Report:", {
    openCharges: openCharges.charges.length,
    satisfiedCharges: satisfiedCharges.charges.length,
    longOutstanding: longOutstandingCharges.length
  });

  return {
    openCharges: openCharges.charges,
    openChargesTotals: openCharges.totals,
    satisfiedCharges: satisfiedCharges.charges,
    satisfiedChargesTotals: satisfiedCharges.totals,
    longOutstandingCharges
  };
}