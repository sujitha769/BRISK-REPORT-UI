export function extractDisposedCases(data) {
  const disposedCases =
    data?.ReportData?.LegalInformation?.DisposedCases || [];

  return disposedCases.map((c) => ({
    caseNo: c.CaseNumber || "-",
    court: c.Court || "-",
    petitioner: c.Petitioner || "-",
    respondent: c.Respondent || "-",
    type: c.CaseType || "-",
    orderLink: c.OrderLink
      ? `https://process.instafinancials.com${c.OrderLink}`
      : null,
    year: c.CaseYear || "-",
  }));
}
