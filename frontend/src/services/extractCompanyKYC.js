export function extractCompanyKYC(apiResponse) {
  const companyKYC =
    apiResponse?.ReportData?.CorporateDirectory?.CompanyKYC;

  if (!companyKYC) return null;

  const epfList = companyKYC.CompanyEPF || [];
  const gstList = companyKYC.CompanyGST || [];

  return {
    companyName: companyKYC.CompanyName || "NA",
    companyCIN: companyKYC.CompanyCIN || "NA",
    companyStatus: companyKYC.CompanyStatus || "NA",
    companyPAN: companyKYC.CompanyPAN || "NA",
    companyTAN: companyKYC.CompanyTAN || "NA",

    epf: {
      first: epfList[0] || "NA",
      moreCount: epfList.length > 1 ? epfList.length - 1 : 0
    },

    gst: {
      first: gstList[0] || "NA",
      moreCount: gstList.length > 1 ? gstList.length - 1 : 0
    }
  };
}
