export const extractRelatedPartyTransactions = (data) => {
  try {
    const transactionData = data?.ReportData?.GroupCompaniesAndRelatedPartyInformation?.RelatedPartyTransactions;
    
    if (!transactionData || !Array.isArray(transactionData)) {
      return [];
    }

    // Sort by financial year (descending) and then by related party name
    const sortedData = [...transactionData].sort((a, b) => {
      const yearCompare = b.FinancialYear.localeCompare(a.FinancialYear);
      if (yearCompare !== 0) return yearCompare;
      return a.RelatedParty.localeCompare(b.RelatedParty);
    });

    return sortedData;
  } catch (error) {
    console.error('Error extracting related party transactions:', error);
    return [];
  }
};