// services/extractAuditorKYC.js

export function extractAuditorKYC(data) {
  try {
    const auditors = data?.ReportData?.AuditorDetailsAndCAROReport?.AuditorsKYCAndDetails;
    
    if (!auditors || !Array.isArray(auditors)) {
      return [];
    }

    return auditors.map(auditor => ({
      firmName: auditor.FirmName || '-',
      year: auditor.FinancialYear || '-',
      regNo: auditor.RegNo || '-',
      auditorName: auditor.AuditorName || '-',
      membership: auditor.Membership || '-',
      address: auditor.Address || '-',
      pan: auditor.AuditorPAN || '-'
    }));
  } catch (error) {
    console.error('Error extracting Auditor KYC data:', error);
    return [];
  }
}