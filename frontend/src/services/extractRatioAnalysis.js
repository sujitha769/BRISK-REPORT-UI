/**
 * Service to extract and transform Ratio Analysis data
 */

export function extractRatioAnalysisStandalone(data) {
  try {
    const ratioData = data?.ReportData?.ComparativeFinancialsStandalone?.RatioAnalysisStandalone;
    
    if (!ratioData) {
      console.warn("Ratio Analysis data not found");
      return null;
    }

    // Get all unique years from any ratio
    const yearsSet = new Set();
    Object.values(ratioData).forEach(ratioArray => {
      if (Array.isArray(ratioArray)) {
        ratioArray.forEach(item => {
          if (item.FinancialYear) {
            yearsSet.add(item.FinancialYear);
          }
        });
      }
    });

    const years = Array.from(yearsSet).sort();

    // Helper function to get value for a specific year from a ratio array
    const getValueForYear = (ratioArray, year) => {
      if (!Array.isArray(ratioArray)) return null;
      const item = ratioArray.find(r => r.FinancialYear === year);
      return item?.Amount !== null && item?.Amount !== undefined ? item.Amount : null;
    };

    // Structure the data by categories
    const ratioAnalysis = {
      years: years,
      sections: [
        {
          title: "Growth ratios",
          rows: [
            {
              name: "Operative Revenue growth (%)",
              key: "OperativeRevenueGrowthPercentages",
              values: years.map(year => getValueForYear(ratioData.OperativeRevenueGrowthPercentages, year))
            },
            {
              name: "EBITDA growth (%)",
              key: "EBITDAGrowths",
              values: years.map(year => getValueForYear(ratioData.EBITDAGrowths, year))
            },
            {
              name: "EPS growth (%)",
              key: "EPSGrowths",
              values: years.map(year => getValueForYear(ratioData.EPSGrowths, year))
            }
          ]
        },
        {
          title: "Profitability Ratios",
          rows: [
            {
              name: "EBITDA margin (%)",
              key: "EBITDAMarginPercentages",
              values: years.map(year => getValueForYear(ratioData.EBITDAMarginPercentages, year))
            },
            {
              name: "PAT margin (%)",
              key: "PATMarginPercentage",
              values: years.map(year => getValueForYear(ratioData.PATMarginPercentage, year))
            },
            {
              name: "Return on capital employed (RoCE) (%)",
              key: "ReturnOnCapitalEmployedPercentage_RoCEs",
              values: years.map(year => getValueForYear(ratioData.ReturnOnCapitalEmployedPercentage_RoCEs, year))
            },
            {
              name: "Return on equity (RoE) (%)",
              key: "ReturnOnEquityPercentage_RoEs",
              values: years.map(year => getValueForYear(ratioData.ReturnOnEquityPercentage_RoEs, year))
            },
            {
              name: "Return on Assets (RoA) (%)",
              key: "ReturnOnAssetsPercentage_RoAs",
              values: years.map(year => getValueForYear(ratioData.ReturnOnAssetsPercentage_RoAs, year))
            }
          ]
        },
        {
          title: "Working Capital Ratios",
          rows: [
            {
              name: "Avg. Inventory holding Days",
              key: "AvgInventoryHoldingDays",
              values: years.map(year => getValueForYear(ratioData.AvgInventoryHoldingDays, year))
            },
            {
              name: "Avg. Debtors Outstanding days",
              key: "AvgDebtorsOutstandingDays",
              values: years.map(year => getValueForYear(ratioData.AvgDebtorsOutstandingDays, year))
            },
            {
              name: "Avg. Trade Payable Days",
              key: "AvgTradePayableDays",
              values: years.map(year => getValueForYear(ratioData.AvgTradePayableDays, year))
            },
            {
              name: "Avg. Cash Conversion Cycle",
              key: "AvgCashConversionCycle",
              values: years.map(year => getValueForYear(ratioData.AvgCashConversionCycle, year))
            }
          ]
        },
        {
          title: "Liquidity and Leverage Ratios",
          rows: [
            {
              name: "Quick Ratio",
              key: "QuickRatios",
              values: years.map(year => getValueForYear(ratioData.QuickRatios, year))
            },
            {
              name: "Current ratio",
              key: "CurrentRatio",
              values: years.map(year => getValueForYear(ratioData.CurrentRatio, year))
            },
            {
              name: "Leverage (TOL/TNW)",
              key: "LeverageTOL_TNWs",
              values: years.map(year => getValueForYear(ratioData.LeverageTOL_TNWs, year))
            },
            {
              name: "Net debt-equity",
              key: "NetDebtEquities",
              values: years.map(year => getValueForYear(ratioData.NetDebtEquities, year))
            },
            {
              name: "Interest coverage",
              key: "InterestCoverages",
              values: years.map(year => getValueForYear(ratioData.InterestCoverages, year))
            }
          ]
        },
        {
          title: "Efficiency Ratios",
          rows: [
            {
              name: "Capital Employed Turnover",
              key: "CapitalEmployedTurnovers",
              values: years.map(year => getValueForYear(ratioData.CapitalEmployedTurnovers, year))
            },
            {
              name: "Asset Turnover",
              key: "AssetTurnovers",
              values: years.map(year => getValueForYear(ratioData.AssetTurnovers, year))
            },
            {
              name: "Inventory Turnover",
              key: "InventoryTurnovers",
              values: years.map(year => getValueForYear(ratioData.InventoryTurnovers, year))
            },
            {
              name: "ReceivablesTurnover",
              key: "ReceivablesTurnovers",
              values: years.map(year => getValueForYear(ratioData.ReceivablesTurnovers, year))
            },
            {
              name: "Working Capital Turnover",
              key: "WorkingCapitalTurnovers",
              values: years.map(year => getValueForYear(ratioData.WorkingCapitalTurnovers, year))
            }
          ]
        }
      ]
    };

    console.log("Extracted Ratio Analysis Data:", ratioAnalysis);
    return ratioAnalysis;

  } catch (error) {
    console.error("Error extracting ratio analysis data:", error);
    return null;
  }
}