export function extractCompanyMaster(apiResponse) {
  const directory = apiResponse?.ReportData?.CorporateDirectory;
  if (!directory) return null;

  const master = directory.CompanyMaster;
  const kyc = directory.CompanyKYC;

  if (!master) return null;

  return {
    // 🔹 Added (needed for Company Snapshot UI)
    companyName: kyc?.CompanyName || "NA",
    cin: kyc?.CompanyCIN || "NA",
    status: kyc?.CompanyStatus || "NA",

    // 🔹 Your existing fields (UNCHANGED)
    dateOfIncorporation: master.DateOfIncorporation || "NA",
    category: master.Category || "NA",
    subCategory: master.SubCategory || "NA",
    classOfCompany: master.Class || "NA",
    listingStatus: master.ListingStatus || "NA",

    authorisedCapital: master.AuthorizedCapital ?? "NA",
    paidUpCapital: master.PaidupCapital ?? "NA",

    address: master.Address || "NA",

    dateOfLastAGM: master.LastAGMDate || "NA",
    dateOfBalanceSheet: master.BalancesheetDate || "NA",

    email: master.Email || "NA",
    webAddress: master.Website || "Not Available",

    directors:
      `Current: ${master.CurrentDirectorsCount} ` +
      `(Past: ${master.PastDirectorsCount})`,

    signatories: master.SignatoriesCount ?? "NA"
  };
}
