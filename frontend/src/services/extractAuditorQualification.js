// services/extractAuditorQualification.js

export function extractAuditorQualification(data) {
  try {
    const qualifications = data?.ReportData?.AuditorDetailsAndCAROReport?.AuditorsReportQualificationDetails;
    
    if (!qualifications || !Array.isArray(qualifications)) {
      return [];
    }

    return qualifications.map(qual => ({
      financialYear: qual.FinancialYear || '-',
      isQualified: qual.IsQualified ? 'True' : 'False',
      detailsOfRemark: qual.DetailsOfSuchRemark || '-',
      directorsComments: qual.DirectorsCommentsOnSuchRemark || '-'
    }));
  } catch (error) {
    console.error('Error extracting Auditor Qualification data:', error);
    return [];
  }
}