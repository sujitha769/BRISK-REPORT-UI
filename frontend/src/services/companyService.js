import briskReport from "../data/briskReport.json";

export function getBasicCompanyDetailsByCIN(cin) {
  const kyc =
    briskReport?.ReportData?.CorporateDirectory?.CompanyKYC;
  const master =
    briskReport?.ReportData?.CorporateDirectory?.CompanyMaster;

  if (!kyc || kyc.CompanyCIN !== cin) {
    throw new Error("Company not found for this CIN");
  }

  return {
    companyName: kyc.CompanyName,
    cin: kyc.CompanyCIN,
    status: kyc.CompanyStatus,
    address: master?.Address || "Not Available",
    email: master?.Email || "Not Available",
    website: master?.Website || "Not Available"
  };
}
