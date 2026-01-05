// FILE: src/services/extractRelatedCompanies.js

/**
 * Service to extract Related Companies data from the API response
 * Handles three categories: By Directors, By Emails, By Addresses
 */

export function extractRelatedCompaniesByDirectors(data) {
  try {
    const related = data?.ReportData?.OtherRelatedCompanies?.RelatedCompaniesByDirectors;
    
    if (!related || !Array.isArray(related) || related.length === 0) {
      return [];
    }

    return related.map(company => ({
      directors: company.Directors || [],
      companyCIN: company.CompanyCIN || 'N/A',
      companyName: company.CompanyName || 'N/A',
      state: company.State || 'N/A',
      city: company.City || 'N/A',
      financialYear: company.FinancialYear || '0',
      dateOfIncorporation: company.DateOfIncorporation || 'N/A',
      companyStatus: company.CompanyStatus || 'N/A',
      industry: company.Industry || 'N/A',
      paidupCapital: company.PaidupCapital || 0,
      totalIncome: company.TotalIncome || 0,
      totalExpenditure: company.TotalExpenditure || 0,
      reservesAndSurplus: company.ReservesAndSurplus || 0,
      networth: company.Networth || 0
    }));
  } catch (error) {
    console.error('Error extracting related companies by directors:', error);
    return [];
  }
}

export function extractRelatedCompaniesByEmails(data) {
  try {
    const related = data?.ReportData?.OtherRelatedCompanies?.RelatedCompaniesByEmails;
    
    if (!related || !Array.isArray(related) || related.length === 0) {
      return [];
    }

    return related.map(company => ({
      emails: company.Emails || [],
      companyCIN: company.CompanyCIN || 'N/A',
      companyName: company.CompanyName || 'N/A',
      state: company.State || 'N/A',
      city: company.City || 'N/A',
      financialYear: company.FinancialYear || '0',
      dateOfIncorporation: company.DateOfIncorporation || 'N/A',
      companyStatus: company.CompanyStatus || 'N/A',
      industry: company.Industry || 'N/A',
      paidupCapital: company.PaidupCapital || 0,
      totalIncome: company.TotalIncome || 0,
      totalExpenditure: company.TotalExpenditure || 0,
      reservesAndSurplus: company.ReservesAndSurplus || 0,
      networth: company.Networth || 0
    }));
  } catch (error) {
    console.error('Error extracting related companies by emails:', error);
    return [];
  }
}

export function extractRelatedCompaniesByAddresses(data) {
  try {
    const related = data?.ReportData?.OtherRelatedCompanies?.RelatedCompaniesByAddresses;
    
    if (!related || !Array.isArray(related) || related.length === 0) {
      return [];
    }

    return related.map(company => ({
      addresses: company.Addresses || [],
      companyCIN: company.CompanyCIN || 'N/A',
      companyName: company.CompanyName || 'N/A',
      state: company.State || 'N/A',
      city: company.City || 'N/A',
      financialYear: company.FinancialYear || '0',
      dateOfIncorporation: company.DateOfIncorporation || 'N/A',
      companyStatus: company.CompanyStatus || 'N/A',
      industry: company.Industry || 'N/A',
      paidupCapital: company.PaidupCapital || 0,
      totalIncome: company.TotalIncome || 0,
      totalExpenditure: company.TotalExpenditure || 0,
      reservesAndSurplus: company.ReservesAndSurplus || 0,
      networth: company.Networth || 0
    }));
  } catch (error) {
    console.error('Error extracting related companies by addresses:', error);
    return [];
  }
}

// Helper function to format currency values
export function formatCurrency(value) {
  if (value === null || value === undefined || value === 0) return '0.00';
  
  const num = parseFloat(value);
  if (isNaN(num)) return '0.00';
  
  // Convert to lakhs (divide by 100000)
  const lakhs = num / 100000;
  return lakhs.toFixed(2);
}