export const financialDataService = {
  // Transform Cash Flow Statement data
  transformCashFlowData: (cashFlowData) => {
    if (!cashFlowData) {
      console.error("transformCashFlowData: No data provided");
      return null;
    }

    // Check if required arrays exist
    if (!cashFlowData.OperatingActivities || 
        !cashFlowData.InvestingActivities || 
        !cashFlowData.FinancingActivities || 
        !cashFlowData.CashAndCashEquivalentAtEnds) {
      console.error("transformCashFlowData: Missing required data arrays");
      return null;
    }

    const years = cashFlowData.OperatingActivities.map(item => 
      item.FinancialYear
    );

    const sections = [
      {
        title: 'Cash Flow Activities',
        rows: [
          {
            label: 'Operating Activities',
            values: cashFlowData.OperatingActivities.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Investing Activities',
            values: cashFlowData.InvestingActivities.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Financing Activities',
            values: cashFlowData.FinancingActivities.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Cash and Cash Equivalent at End',
            values: cashFlowData.CashAndCashEquivalentAtEnds.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          }
        ]
      }
    ];

    console.log("Transformed sections:", sections);
    return { years, sections };
  },

  // Transform Balance Sheet data
  transformBalanceSheetData: (balanceSheetData) => {
    if (!balanceSheetData) return null;

    const years = balanceSheetData.NetWorth.map(item => 
      item.FinancialYear
    );

    const sections = [
      {
        title: 'Equity and Liabilities',
        rows: [
          {
            label: 'Net Worth',
            values: balanceSheetData.NetWorth.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Borrowings',
            values: balanceSheetData.Borrowings.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Other Non-Current Liabilities',
            values: balanceSheetData.OtherNonCurrentLiabilities.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Current liabilities and provisions',
            values: balanceSheetData.CurrentLiabilitiesAndProvisions.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Deferred tax liability/(asset)',
            values: balanceSheetData.DeferredTaxLiabilityOfAssets.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Total Equity and Liabilities',
            values: balanceSheetData.TotalEquityAndLiabilities.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          }
        ]
      },
      {
        title: 'Assets',
        rows: [
          {
            label: 'Tangible assets',
            values: balanceSheetData.TangibleAssets.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Capital WIP and Others',
            values: balanceSheetData.CapitalWIPAndOthers.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Intangible assets',
            values: balanceSheetData.IntangibleAssets.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Investments',
            values: balanceSheetData.Investments.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Loans and advances',
            values: balanceSheetData.LoansAndAdvances.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Inventory',
            values: balanceSheetData.Inventories.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Trade Receivables',
            values: balanceSheetData.TradeReceivables.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Cash and Bank',
            values: balanceSheetData.CashAndBankBalances.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          }
        ]
      }
    ];

    return { years, sections };
  },

  // Transform P&L Statement data
  transformProfitLossData: (plData) => {
    if (!plData) return null;

    const years = plData.OperatingRevenues.map(item => 
      item.FinancialYear
    );

    const sections = [
      {
        title: 'Revenue',
        rows: [
          {
            label: 'Operating Revenues',
            values: plData.OperatingRevenues.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Other Incomes',
            values: plData.OtherIncomes.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Total Revenues',
            values: plData.TotalRevenues.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          }
        ]
      },
      {
        title: 'Expenses & Profit',
        rows: [
          {
            label: 'Total Expenses',
            values: plData.TotalExpenses.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'EBDITA',
            values: plData.EBDITA.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Depreciations',
            values: plData.Depreciations.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Interests',
            values: plData.Interests.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'PBT',
            values: plData.PBT.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'Taxes',
            values: plData.Taxes.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          },
          {
            label: 'PAT',
            values: plData.PAT.reduce((acc, item) => {
              acc[item.FinancialYear] = item.Amount;
              return acc;
            }, {})
          }
        ]
      }
    ];

    return { years, sections };
  },

  // Transform Asset & Liability Breakup for Chart
  transformAssetLiabilityChartData: (balanceSheetData) => {
    if (!balanceSheetData) return [];

    const years = balanceSheetData.NetWorth.map(item => item.FinancialYear);
    
    return years.map((year, index) => ({
      year: year,
      // Assets
      tangibleAssets: balanceSheetData.TangibleAssets[index].Amount,
      investments: balanceSheetData.Investments[index].Amount,
      loansAndAdvances: balanceSheetData.LoansAndAdvances[index].Amount,
      inventory: balanceSheetData.Inventories[index].Amount,
      tradeReceivables: balanceSheetData.TradeReceivables[index].Amount,
      cashAndBank: balanceSheetData.CashAndBankBalances[index].Amount,
      otherAssets: balanceSheetData.IntangibleAssets[index].Amount + 
                   balanceSheetData.CapitalWIPAndOthers[index].Amount,
      // Liabilities
      netWorth: balanceSheetData.NetWorth[index].Amount,
      borrowings: balanceSheetData.Borrowings[index].Amount,
      otherNonCurrentLiabilities: balanceSheetData.OtherNonCurrentLiabilities[index].Amount,
      currentLiabilities: balanceSheetData.CurrentLiabilitiesAndProvisions[index].Amount,
      deferredTax: balanceSheetData.DeferredTaxLiabilityOfAssets[index].Amount
    }));
  }
};