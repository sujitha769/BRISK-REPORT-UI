/* -------- NIC Products -------- */
export function extractNICProducts(apiResponse) {
  const nicProducts =
    apiResponse?.ReportData?.ProductAndServices?.NICProductsDetails;

  if (!Array.isArray(nicProducts)) return [];

  return nicProducts.map((item) => ({
    financialYear: item.FinancialYear || "NA",
    mainActivityGroup: item.MainActivityGroupDescription || "NA",
    businessActivity: item.BusinessActivityDescription || "NA",
    turnoverPercentage:
      item.TurnoverPercentage !== undefined
        ? item.TurnoverPercentage.toFixed(2)
        : "NA"
  }));
}

/* -------- Principal Products -------- */
export function extractPrincipalProducts(apiResponse) {
  const products =
    apiResponse?.ReportData?.ProductAndServices?.PrincipalProductsAndServices;

  if (!Array.isArray(products)) return [];

  return products.map((item) => ({
    financialYear: item.FinancialYear || "NA",
    itc8Digit: item.ITC8Digit || "NA",
    itc4Digit: item.ITC4Digit || "NA",
    category: item.Category || "NA",
    description: item.Description || "NA",
    turnover8Digit: item.ITC8DigitTurnover ?? "NA",
    turnover4Digit: item.ITC4DigitTurnover ?? "NA"
  }));
}
