export function extractLoansAndAdvances(data) {
  try {
    const loansData = data?.ReportData?.SchedulesAndDisclosuresFinancialsInfo?.LoansAndAdvancesSchedulesAndDisclosures;
    
    if (!loansData) {
      return null;
    }

    // Get all financial years from any available array
    const getYears = () => {
      const sources = [
        loansData.SecuredLongGood,
        loansData.UnsecuredLongGood?.CapitalAdvances,
        loansData.LongTermLoansAndAdvances
      ];
      
      for (const source of sources) {
        if (source && source.length > 0) {
          return source.map(item => item.FinancialYear);
        }
      }
      return [];
    };

    const years = getYears();

    // Helper function to get amount for a specific year
    const getAmountForYear = (dataArray, year) => {
      if (!dataArray || dataArray.length === 0) return null;
      const item = dataArray.find(d => d.FinancialYear === year);
      return item ? item.Amount : null;
    };

    // Build rows data
    const rows = [
      {
        name: "Unsecured - Long - Good",
        isHeader: true,
        indent: 0
      },
      {
        name: "Unsecured - Long - Good - Capital advances",
        dataKey: "UnsecuredLongGood.CapitalAdvances",
        indent: 1
      },
      {
        name: "Unsecured - Long - Good - Security deposits",
        dataKey: "UnsecuredLongGood.SecurityDeposits",
        indent: 1
      },
      {
        name: "Unsecured - Long - Good - Loans and advances to Related Parties",
        dataKey: "UnsecuredLongGood.LoansAndAdvancesToRelatedParties",
        indent: 1
      },
      {
        name: "Unsecured - Long - Good - Other loans and advances",
        dataKey: "UnsecuredLongGood.OtherLoansAndAdvances",
        indent: 1
      },
      {
        name: "Less : Provision on Related Parties - Unsecured - Long - Good",
        dataKey: "UnsecuredLongGood.LessProvisionOnRelatedParties",
        indent: 1
      },
      {
        name: "Less : Provision on Others - Unsecured - Long - Good",
        dataKey: "UnsecuredLongGood.LessProvisionOnOthers",
        indent: 1
      },
      {
        name: "Total Unsecured - Long - Good",
        dataKey: "calculated.totalUnsecuredLongGood",
        indent: 0,
        isBold: true
      },
      {
        name: "Unsecured - Long - Doubtful",
        isHeader: true,
        indent: 0
      },
      {
        name: "Unsecured - Long - Doubtful - Other loans and advances",
        dataKey: "UnsecuredLongDoubtful.OtherLoansAndAdvances",
        indent: 1
      },
      {
        name: "Less : Provision on Others - Unsecured - Long - Doubtful",
        dataKey: "UnsecuredLongDoubtful.LessProvisionOnOthers",
        indent: 1
      },
      {
        name: "Total Unsecured - Long - Doubtful",
        dataKey: "calculated.totalUnsecuredLongDoubtful",
        indent: 0,
        isBold: true
      },
      {
        name: "Long-Term Loans and Advances",
        dataKey: "LongTermLoansAndAdvances",
        indent: 0,
        isBold: true
      },
      {
        name: "Short-Term Loans and Advances",
        dataKey: "ShortTermLoansAndAdvances",
        indent: 0,
        isBold: true
      },
      {
        name: "Total Loans and Advances",
        dataKey: "TotalLoansAndAdvances",
        indent: 0,
        isBold: true,
        isTotal: true
      }
    ];

    // Helper to navigate nested object path
    const getValueFromPath = (obj, path) => {
      const keys = path.split('.');
      let value = obj;
      for (const key of keys) {
        if (value && typeof value === 'object') {
          value = value[key];
        } else {
          return null;
        }
      }
      return value;
    };

    // Calculate totals for each year
    const calculateTotals = (year) => {
      const unsecuredLongGoodItems = [
        loansData.UnsecuredLongGood?.CapitalAdvances,
        loansData.UnsecuredLongGood?.SecurityDeposits,
        loansData.UnsecuredLongGood?.LoansAndAdvancesToRelatedParties,
        loansData.UnsecuredLongGood?.OtherLoansAndAdvances
      ];

      const unsecuredLongGoodDeductions = [
        loansData.UnsecuredLongGood?.LessProvisionOnRelatedParties,
        loansData.UnsecuredLongGood?.LessProvisionOnOthers
      ];

      let totalUnsecuredLongGood = 0;
      unsecuredLongGoodItems.forEach(arr => {
        const amt = getAmountForYear(arr, year);
        if (amt !== null) totalUnsecuredLongGood += amt;
      });
      unsecuredLongGoodDeductions.forEach(arr => {
        const amt = getAmountForYear(arr, year);
        if (amt !== null) totalUnsecuredLongGood -= amt;
      });

      const doubtfulOther = getAmountForYear(loansData.UnsecuredLongDoubtful?.OtherLoansAndAdvances, year) || 0;
      const doubtfulProvision = getAmountForYear(loansData.UnsecuredLongDoubtful?.LessProvisionOnOthers, year) || 0;
      const totalUnsecuredLongDoubtful = doubtfulOther - doubtfulProvision;

      return {
        totalUnsecuredLongGood,
        totalUnsecuredLongDoubtful
      };
    };

    // Build table data
    const tableData = rows.map(row => {
      const rowData = {
        elementName: row.name,
        indent: row.indent || 0,
        isBold: row.isBold || false,
        isHeader: row.isHeader || false,
        isTotal: row.isTotal || false
      };

      years.forEach(year => {
        if (row.isHeader) {
          rowData[year] = null;
        } else if (row.dataKey) {
          if (row.dataKey.startsWith('calculated.')) {
            const totals = calculateTotals(year);
            const calcKey = row.dataKey.split('.')[1];
            rowData[year] = totals[calcKey];
          } else {
            const pathParts = row.dataKey.split('.');
            let dataArray = loansData;
            
            for (const part of pathParts) {
              if (dataArray && typeof dataArray === 'object') {
                dataArray = dataArray[part];
              } else {
                dataArray = null;
                break;
              }
            }
            
            rowData[year] = getAmountForYear(dataArray, year);
          }
        } else {
          rowData[year] = null;
        }
      });

      return rowData;
    });

    return {
      years,
      data: tableData
    };

  } catch (error) {
    console.error("Error extracting Loans and Advances data:", error);
    return null;
  }
}