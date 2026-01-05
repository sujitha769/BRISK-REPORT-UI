/**
 * Service to extract Charges data (Open and Satisfied)
 * @param {Object} data - The full report data object
 * @returns {Object} Structured charges data
 */
export function extractCharges(data) {
  try {
    const chargesData = data?.ReportData?.ChargeSearchReport;

    if (!chargesData) {
      return null;
    }

    // Extract Open Charges
    const openCharges = chargesData.OpenCharges || [];

    // Extract Satisfied Charges
    const satisfiedCharges = chargesData.SatisfiedCharges || [];

    // Group open charges by charge holder
    const groupedOpenCharges = [];
    let currentGroup = [];
    let currentHolder = null;

    openCharges.forEach(charge => {
      // Check if this is a total row
      if (charge.ChargeHolder.includes('Total Charge') || charge.ChargeHolder.includes('Sum of all Charges')) {
        if (currentGroup.length > 0) {
          groupedOpenCharges.push({
            holder: currentHolder,
            charges: [...currentGroup],
            total: charge.Amount
          });
          currentGroup = [];
          currentHolder = null;
        } else if (charge.ChargeHolder.includes('Sum of all Charges')) {
          // This is the grand total
          groupedOpenCharges.push({
            holder: 'Sum of all Charges',
            charges: [],
            total: charge.Amount,
            isGrandTotal: true
          });
        }
      } else {
        // Regular charge row
        if (currentHolder !== charge.ChargeHolder) {
          currentHolder = charge.ChargeHolder;
        }
        currentGroup.push(charge);
      }
    });

    // Group satisfied charges similarly
    const groupedSatisfiedCharges = [];
    let currentSatGroup = [];
    let currentSatHolder = null;

    if (satisfiedCharges && satisfiedCharges.length > 0) {
      satisfiedCharges.forEach(charge => {
        if (charge.ChargeHolder.includes('Total Charge') || charge.ChargeHolder.includes('Sum of all Charges')) {
          if (currentSatGroup.length > 0) {
            groupedSatisfiedCharges.push({
              holder: currentSatHolder,
              charges: [...currentSatGroup],
              total: charge.Amount
            });
            currentSatGroup = [];
            currentSatHolder = null;
          } else if (charge.ChargeHolder.includes('Sum of all Charges')) {
            groupedSatisfiedCharges.push({
              holder: 'Sum of all Charges',
              charges: [],
              total: charge.Amount,
              isGrandTotal: true
            });
          }
        } else {
          if (currentSatHolder !== charge.ChargeHolder) {
            currentSatHolder = charge.ChargeHolder;
          }
          currentSatGroup.push(charge);
        }
      });
    }

    return {
      openCharges: groupedOpenCharges,
      satisfiedCharges: groupedSatisfiedCharges,
      rawOpenCharges: openCharges,
      rawSatisfiedCharges: satisfiedCharges
    };
  } catch (error) {
    console.error("Error extracting Charges data:", error);
    return null;
  }
}