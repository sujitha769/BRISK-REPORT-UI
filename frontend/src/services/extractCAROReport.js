// services/extractCAROReport.js

export function extractCAROReport(data) {
  try {
    const caro = data?.ReportData?.AuditorDetailsAndCAROReport?.CAROReport;
    
    if (!caro) {
      return [];
    }

    // Get all financial years from any CARO element
    const allYears = new Set();
    Object.values(caro).forEach(element => {
      if (Array.isArray(element)) {
        element.forEach(item => {
          if (item.FinancialYear) {
            allYears.add(item.FinancialYear);
          }
        });
      }
    });

    const years = Array.from(allYears).sort();

    // Create a map for each element
    const elementMap = {};
    
    // Process each CARO element
    Object.keys(caro).forEach(key => {
      if (Array.isArray(caro[key])) {
        elementMap[key] = {};
        caro[key].forEach(item => {
          elementMap[key][item.FinancialYear] = item.Status || '-';
        });
      }
    });

    // Create rows for the table
    const rows = [
      {
        elementName: 'Disclosure about loans granted to parties covered under section 189 of companies act',
        key: 'DisclosureAboutLoansGrantedToPartiesCoveredUnderSection189OfCompaniesAct'
      },
      {
        elementName: 'Disclosure regarding receipt of loans granted',
        key: 'DisclosureRegardingReceiptOfLoansGranted'
      },
      {
        elementName: 'Terms of recovery of Loans granted',
        key: 'TermsOfRecoveryOfLoansGranted'
      },
      {
        elementName: 'Deposits accepted',
        key: 'DepositsAccepted'
      },
      {
        elementName: 'Fixed Assets Related Disclosures',
        key: 'FixedAssetsRelatedDisclosures'
      },
      {
        elementName: 'Quantitative details of Fixed Assets',
        key: 'QuantitativeDetailsOfFixedAssets'
      },
      {
        elementName: 'Physical Verification of Fixed Assets',
        key: 'PhysicalVerificationOfFixedAssets'
      },
      {
        elementName: 'Inventories Related Disclosures',
        key: 'InventoriesRelatedDisclosures'
      },
      {
        elementName: 'Loans Related Disclosures',
        key: 'LoansRelatedDisclosures'
      },
      {
        elementName: 'Internal Control System related disclosures',
        key: 'InternalControlSystemRelatedDisclosures'
      },
      {
        elementName: 'Maintenance of Cost Records',
        key: 'MaintenanceOfCostRecords'
      },
      {
        elementName: 'Statutory Dues',
        key: 'StatutoryDues'
      },
      {
        elementName: 'Payment of Undisputed Statutory Dues',
        key: 'PaymentOfUndisputedStatutoryDues'
      },
      {
        elementName: 'Disputed statutory dues',
        key: 'DisputedStatutoryDues'
      },
      {
        elementName: 'Default in repayment of financial dues',
        key: 'DefaultInRepaymentOfFinancialDues'
      },
      {
        elementName: 'Term Loans used for other purposes',
        key: 'TermLoansUsedForOtherPurposes'
      },
      {
        elementName: 'Any material fraud reported during period',
        key: 'AnyMaterialFraudReportedDuringPeriod'
      }
    ];

    return rows.map(row => {
      const yearData = {};
      years.forEach(year => {
        yearData[year] = elementMap[row.key] && elementMap[row.key][year] 
          ? elementMap[row.key][year] 
          : '-';
      });

      return {
        elementName: row.elementName,
        years: years,
        yearData: yearData
      };
    });

  } catch (error) {
    console.error('Error extracting CARO Report data:', error);
    return [];
  }
}