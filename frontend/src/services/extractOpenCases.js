export function extractOpenCases(data) {
  const openCases =
    data?.ReportData?.LegalInformation?.OpenCases || [];

  return openCases.map((c) => ({
    caseNo: c.CaseNumber || "-",     // ✅ FIXED
    court: c.Court || "-",
    petitioner: c.Petitioner || "-",
    respondent: c.Respondent || "-",
    type: c.CaseType || "-",
    orderLink: c.OrderLink || null,
    year: c.CaseYear || "-",         // ✅ FIXED
  }));
}
