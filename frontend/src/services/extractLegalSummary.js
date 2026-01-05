export function extractLegalSummary(data) {
  if (!data?.ReportData?.LegalInformation) return null;

  const legal = data.ReportData.LegalInformation;

  const categorizeCase = (c) => {
    const t = (c.CaseType || "").toLowerCase();
    if (t.includes("criminal")) return "criminal";
    if (t.includes("civil") || t.includes("writ") || t.includes("appeal"))
      return "civil";
    return "unclassified";
  };

  const courtType = (court) => {
    const c = (court || "").toLowerCase();
    if (c.includes("supreme")) return "supremeCourt";
    if (c.includes("high")) return "highCourt";
    if (c.includes("district")) return "districtCourt";
    if (c.includes("tribunal")) return "tribunal";
    return "other";
  };

  const initBreakdown = () => ({
    supremeCourt: 0,
    highCourt: 0,
    districtCourt: 0,
    tribunal: 0,
    other: 0,
  });

  const result = {
    totalCases: 0,
    types: {
      civil: {
        open: { total: 0, breakdown: initBreakdown() },
        disposed: { total: 0, breakdown: initBreakdown() },
        unknown: { total: 0, breakdown: initBreakdown() },
      },
      criminal: {
        open: { total: 0, breakdown: initBreakdown() },
        disposed: { total: 0, breakdown: initBreakdown() },
        unknown: { total: 0, breakdown: initBreakdown() },
      },
      unclassified: {
        open: { total: 0, breakdown: initBreakdown() },
        disposed: { total: 0, breakdown: initBreakdown() },
        unknown: { total: 0, breakdown: initBreakdown() },
      },
    },
  };

  const processCases = (cases, status) => {
    if (!Array.isArray(cases)) return;

    cases.forEach((c) => {
      const type = categorizeCase(c);
      const court = courtType(c.Court);

      result.totalCases++;
      result.types[type][status].total++;
      result.types[type][status].breakdown[court]++;
    });
  };

  processCases(legal.OpenCases, "open");
  processCases(legal.DisposedCases, "disposed");
  processCases(legal.UnknownStatusCases, "unknown");

  return result;
}
