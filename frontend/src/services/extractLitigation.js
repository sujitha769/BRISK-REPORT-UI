/**
 * Extract litigation data from API response
 * @param {Object} data - Full API response
 * @returns {Object} - Formatted litigation data for all three tables
 */
export function extractLitigation(data) {
  try {
    const reportData = data?.ReportData;
    
    if (!reportData) {
      console.error("ReportData not found");
      return {
        litigateCases: [],
        suitFiledCases: [],
        mcaComplaints: []
      };
    }

    // Helper function to format ITAT case data
    const formatITATCase = (caseItem) => {
      return {
        appeal: caseItem.Appeal || "NA",
        appellant: caseItem.Appellant || "NA",
        respondent: caseItem.Respondent || "NA",
        tribunalBench: caseItem.TribunalBench || "NA",
        assessmentYear: caseItem.AssessmentYear || "NA",
        benchAllotted: caseItem.BenchAllotted || "NA",
        caseStatus: caseItem.CaseStatus || "NA",
        tribunalOrderLink: caseItem.TribunalOrderLink || null
      };
    };

    // Helper function to format suit filed case data
    const formatSuitFiledCase = (suitCase) => {
      return {
        lenderName: suitCase.LenderName || "NA",
        branch: suitCase.Branch || "NA",
        directorsNamed: suitCase.DirectorsNamed || "NA",
        reportingPeriod: suitCase.ReportingPeriod || "NA",
        amountOutstanding: suitCase.AmountOutstanding 
          ? `₹${parseFloat(suitCase.AmountOutstanding).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : "NA",
        category: suitCase.Category || "NA"
      };
    };

    // Helper function to format MCA complaint data
    const formatMCAComplaint = (complaint) => {
      return {
        complaintType: complaint.ComplaintType || "NA",
        srn: complaint.SRN || "NA",
        filingDate: complaint.FilingDate || "NA",
        complaintStatus: complaint.ComplaintStatus || "NA"
      };
    };

    // Extract ITAT Cases (Note: field name is ITATCases in your JSON)
    const litigateCases = Array.isArray(reportData.ITATCases) 
      ? reportData.ITATCases.map(formatITATCase)
      : [];

    // Extract Suit Filed Cases (Note: field name is SuitFiledCasesAndWillfulDefaulter_Historical)
    const suitFiledCases = Array.isArray(reportData.SuitFiledCasesAndWillfulDefaulter_Historical) 
      ? reportData.SuitFiledCasesAndWillfulDefaulter_Historical.map(formatSuitFiledCase)
      : [];

    // Extract MCA Serious Complaints (Note: field name is MCASeriousComplaints)
    const mcaComplaints = Array.isArray(reportData.MCASeriousComplaints) 
      ? reportData.MCASeriousComplaints.map(formatMCAComplaint)
      : [];

    return {
      litigateCases,
      suitFiledCases,
      mcaComplaints
    };
  } catch (error) {
    console.error("Error extracting litigation data:", error);
    return {
      litigateCases: [],
      suitFiledCases: [],
      mcaComplaints: []
    };
  }
}