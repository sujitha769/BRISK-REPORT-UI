/**
 * Service to extract Borrowings data
 * @param {Object} data - The full report data object
 * @returns {Object} Structured borrowings data with years and values
 */
export function extractBorrowings(data) {
  try {
    const borrowingsData = 
      data?.ReportData?.SchedulesAndDisclosuresFinancialsInfo?.Borrowings;

    if (!borrowingsData) {
      return null;
    }

    // Extract Secured Borrowings
    const securedBorrowingsLongTerm = borrowingsData.SecuredBorrowings?.SecuredBorrowingsLongTerm || {};
    const securedBorrowingsShortTerm = borrowingsData.SecuredBorrowings?.SecuredBorrowingsShortTerm || {};
    
    const securedLongLoansFromBanks = 
      securedBorrowingsLongTerm.LoansFromBanks || [];
    
    const securedLongLoansFromOthers = 
      securedBorrowingsLongTerm.LoansFromOthers || [];
    
    const securedLongOtherBorrowings = 
      securedBorrowingsLongTerm.OtherBorrowings || [];

    const securedShortLoansRepayableOnDemandFromBanks = 
      securedBorrowingsShortTerm.LoansRepayableOnDemandFromBanks || [];
    
    const securedShortLoansRepayableOnDemandFromOthers = 
      securedBorrowingsShortTerm.LoansrepayableOnDemandFromOthers || [];
    
    const securedShortOtherBorrowings = 
      securedBorrowingsShortTerm.OtherBorrowings || [];

    const totalSecuredBorrowings = 
      borrowingsData.SecuredBorrowings?.TotalSecuredBorrowings || [];

    // Extract Unsecured Borrowings
    const unsecuredBorrowingsLongTerm = borrowingsData.UnsecuredBorrowings?.UnsecuredBorrowingsLongTerm || {};
    const unsecuredBorrowingsShortTerm = borrowingsData.UnsecuredBorrowings?.UnsecuredBorrowingsShortTerm || {};

    const unsecuredLongLoansFromBanks = 
      unsecuredBorrowingsLongTerm.LoansFromBanks || [];
    
    const unsecuredLongLoansFromOthers = 
      unsecuredBorrowingsLongTerm.LoansFromOthers || [];
    
    const unsecuredLongOtherBorrowings = 
      unsecuredBorrowingsLongTerm.OtherBorrowings || [];

    const unsecuredShortLoansRepayableOnDemandFromBanks = 
      unsecuredBorrowingsShortTerm.LoansRepayableOnDemandFromBanks || [];
    
    const unsecuredShortLoansRepayableOnDemandFromOthers = 
      unsecuredBorrowingsShortTerm.LoansRepayableOnDemandFromOthers || [];
    
    const unsecuredShortOtherBorrowings = 
      unsecuredBorrowingsShortTerm.UnsecuredOtherBorrowings || [];

    const totalUnsecuredBorrowings = 
      borrowingsData.UnsecuredBorrowings?.TotalUnsecuredBorrowings || [];

    const totalBorrowings = 
      borrowingsData.TotalBorrowings || [];

    return {
      secured: {
        longTerm: {
          loansFromBanks: securedLongLoansFromBanks,
          loansFromOthers: securedLongLoansFromOthers,
          otherBorrowings: securedLongOtherBorrowings
        },
        shortTerm: {
          loansRepayableOnDemandFromBanks: securedShortLoansRepayableOnDemandFromBanks,
          loansRepayableOnDemandFromOthers: securedShortLoansRepayableOnDemandFromOthers,
          otherBorrowings: securedShortOtherBorrowings
        },
        total: totalSecuredBorrowings
      },
      unsecured: {
        longTerm: {
          loansFromBanks: unsecuredLongLoansFromBanks,
          loansFromOthers: unsecuredLongLoansFromOthers,
          otherBorrowings: unsecuredLongOtherBorrowings
        },
        shortTerm: {
          loansRepayableOnDemandFromBanks: unsecuredShortLoansRepayableOnDemandFromBanks,
          loansRepayableOnDemandFromOthers: unsecuredShortLoansRepayableOnDemandFromOthers,
          otherBorrowings: unsecuredShortOtherBorrowings
        },
        total: totalUnsecuredBorrowings
      },
      totalBorrowings
    };
  } catch (error) {
    console.error("Error extracting Borrowings:", error);
    return null;
  }
}