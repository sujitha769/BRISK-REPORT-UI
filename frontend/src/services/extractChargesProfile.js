/**
 * Service to extract Charges Profile data
 */

export function extractChargesProfile(data) {
  try {
    const chargesData = data?.ReportData?.ChargesProfileReport;
    
    if (!chargesData) {
      console.warn("Charges Profile data not found");
      return null;
    }

    const { ChargesProfiles, FutureCharges, PersonalGuarantees } = chargesData;

    // Helper function to clean HTML content
    const cleanHTML = (htmlString) => {
      if (!htmlString) return "";
      // Remove HTML tags and decode entities
      return htmlString
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\r\n/g, '\n')
        .trim();
    };

    // Helper function to parse list of attachments
    const parseAttachments = (attachmentString) => {
      if (!attachmentString) return [];
      // Split by common delimiters
      return attachmentString
        .split(/[\n,]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    };

    // Transform charges profiles
    const transformedCharges = ChargesProfiles?.map(charge => ({
      chargeID: charge.ChargeID || "",
      chargeHolder: charge.ChargeHolderName || "",
      chargeAmount: charge.ChargeAmount || 0,
      chargeHolderCity: charge.ChargeHolderCity || "",
      chargeHolderState: charge.ChargeHolderState || "",
      attachmentDetails: charge.AttachmentDetails || "",
      listOfAttachments: parseAttachments(charge.ListOfAttachments),
      originalCreationDate: charge.OriginalCreationDate || "",
      modification: charge.Modification || "",
      consortiumFinance: charge.ConsortiumFinance || "",
      jointCharge: charge.JointCharge || "",
      chargeOn: cleanHTML(charge.ChargeOn),
      interestRateDetails: charge.InterestRateDetails || "",
      termsOfRepayment: charge.TermsOfRepayment || "",
      margin: charge.Margin || "",
      extentAndOperation: charge.ExtentAndOperationOfTheCharge || "",
      shortParticulars: charge.ShortParticularsOfThePropertyOrAssetsCharged || "",
      modificationHistory: cleanHTML(charge.ModificationHistory),
      downloadChargeForm: charge.DownloadChargeForm || "",
      othersTerms: charge.OthersTerms || "",
      nameOfPerson: charge.NameOfPersonInCaseTheSaidPropertyIsNotRegisteredInCompanyName || ""
    })) || [];

    const result = {
      charges: transformedCharges,
      futureCharges: FutureCharges,
      personalGuarantees: PersonalGuarantees
    };

    console.log("Extracted Charges Profile Data:", result);
    return result;

  } catch (error) {
    console.error("Error extracting charges profile data:", error);
    return null;
  }
}