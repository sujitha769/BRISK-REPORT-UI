// services/extractRiskReport.js

export function extractPiotroskiFScore(data) {
  try {
    const piotroskiData = data?.ReportData?.RiskReport?.PiotroskisFScore;
    
    if (!piotroskiData) {
      return null;
    }

    // Get all unique years
    const yearsSet = new Set();
    
    const allArrays = [
      piotroskiData.ProfitabilityStrengths,
      piotroskiData.LeverageAndLiquidityStrength,
      piotroskiData.OperatingEfficiency,
      piotroskiData.OverallFinancialsStrengthTest
    ];

    allArrays.forEach(arr => {
      if (arr && Array.isArray(arr)) {
        arr.forEach(item => {
          if (item.FinancialYear) {
            yearsSet.add(item.FinancialYear);
          }
        });
      }
    });

    const years = Array.from(yearsSet).sort();

    if (years.length === 0) {
      return null;
    }

    // Helper function to get amount for a specific year
    const getAmountForYear = (dataArray, year) => {
      if (!dataArray || !Array.isArray(dataArray)) return null;
      const item = dataArray.find(d => d.FinancialYear === year);
      return item ? item.Amount : null;
    };

    // Build table data
    const tableData = [
      {
        testName: "Profitability Strength",
        data: years.map(year => getAmountForYear(piotroskiData.ProfitabilityStrengths, year))
      },
      {
        testName: "Leverage & Liquidity Strength",
        data: years.map(year => getAmountForYear(piotroskiData.LeverageAndLiquidityStrength, year))
      },
      {
        testName: "Operating Efficiency",
        data: years.map(year => getAmountForYear(piotroskiData.OperatingEfficiency, year))
      },
      {
        testName: "Overall Financials Strength Test",
        data: years.map(year => getAmountForYear(piotroskiData.OverallFinancialsStrengthTest, year)),
        isBold: true
      }
    ];

    return {
      years,
      tableData,
      redFlags: piotroskiData.RedFlags || []
    };

  } catch (error) {
    console.error("Error extracting Piotroski F-Score data:", error);
    return null;
  }
}

export function extractTraditionalModels(data) {
  try {
    const modelsData = data?.ReportData?.RiskReport?.OtherWidelyAcceptedTraditionalModels;
    
    if (!modelsData) {
      return null;
    }

    // Get all unique years
    const yearsSet = new Set();
    
    const allArrays = [
      modelsData.BeneishsMScore_ProfitManipulationTests,
      modelsData.AltmanZScore_FinancialDistressTest,
      modelsData.MontiersCScore_WindowDressingTest
    ];

    allArrays.forEach(arr => {
      if (arr && Array.isArray(arr)) {
        arr.forEach(item => {
          if (item.FinancialYear) {
            yearsSet.add(item.FinancialYear);
          }
        });
      }
    });

    const years = Array.from(yearsSet).sort();

    if (years.length === 0) {
      return null;
    }

    // Helper function to get amount for a specific year
    const getAmountForYear = (dataArray, year) => {
      if (!dataArray || !Array.isArray(dataArray)) return null;
      const item = dataArray.find(d => d.FinancialYear === year);
      return item ? item.Amount : null;
    };

    // Build table data
    const tableData = [
      {
        testName: "Beneish's M-Score (Profit Manipulation Test)",
        data: years.map(year => getAmountForYear(modelsData.BeneishsMScore_ProfitManipulationTests, year))
      },
      {
        testName: "Altman Z-Score (Financial Distress Test)",
        data: years.map(year => getAmountForYear(modelsData.AltmanZScore_FinancialDistressTest, year))
      },
      {
        testName: "Montier's C-Score (Window Dressing Test)",
        data: years.map(year => getAmountForYear(modelsData.MontiersCScore_WindowDressingTest, year))
      }
    ];

    return {
      years,
      tableData,
      redFlags: modelsData.RedFlags || [],
      greenFlags: modelsData.GreenFlags || []
    };

  } catch (error) {
    console.error("Error extracting Traditional Models data:", error);
    return null;
  }
}