export function extractOwnershipDetails(apiResponse) {
  const raw =
    apiResponse?.ReportData?.OwnershipDetails;

  if (!Array.isArray(raw)) {
    return { years: [], rows: [] };
  }

  // 1️⃣ Collect unique years
  const yearSet = new Set();

  raw.forEach((shareholder) => {
    shareholder.OwnershipPercentages.forEach((y) => {
      yearSet.add(y.FinancialYear);
    });
  });

  const years = Array.from(yearSet).sort(); // ascending order

  // 2️⃣ Build table rows
  const rows = raw.map((shareholder) => {
    const yearMap = {};

    shareholder.OwnershipPercentages.forEach((y) => {
      yearMap[y.FinancialYear] = y.OwnershipPercentage;
    });

    return {
      shareholderName: shareholder.ShareholderName,
      values: yearMap
    };
  });

  return { years, rows };
}
