export const extractRelatedPartyNotAtArmLength = (data) => {
  try {
    const notAtArmLengthData = data?.ReportData?.GroupCompaniesAndRelatedPartyInformation?.RelatedPartyTransactionsNotAtArmLengthPriceSchedule;
    
    if (!notAtArmLengthData || !Array.isArray(notAtArmLengthData) || notAtArmLengthData.length === 0) {
      return [];
    }

    // Sort by financial year (descending) and then by related party name
    const sortedData = [...notAtArmLengthData].sort((a, b) => {
      const yearCompare = b.FinancialYear.localeCompare(a.FinancialYear);
      if (yearCompare !== 0) return yearCompare;
      return a.NameOfTheRelatedParty.localeCompare(b.NameOfTheRelatedParty);
    });

    return sortedData;
  } catch (error) {
    console.error('Error extracting related party not at arm length:', error);
    return [];
  }
};