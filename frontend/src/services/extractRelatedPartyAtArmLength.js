export const extractRelatedPartyAtArmLength = (data) => {
  try {
    const atArmLengthData = data?.ReportData?.GroupCompaniesAndRelatedPartyInformation?.RelatedPartyMaterialTransactionsAtArmLengthPriceSchedule;
    
    if (!atArmLengthData || !Array.isArray(atArmLengthData) || atArmLengthData.length === 0) {
      return [];
    }

    // Sort by financial year (descending) and then by related party name
    const sortedData = [...atArmLengthData].sort((a, b) => {
      const yearCompare = b.FinancialYear.localeCompare(a.FinancialYear);
      if (yearCompare !== 0) return yearCompare;
      return a.NameOfTheRelatedParty.localeCompare(b.NameOfTheRelatedParty);
    });

    return sortedData;
  } catch (error) {
    console.error('Error extracting related party at arm length:', error);
    return [];
  }
};