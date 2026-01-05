export function extractTradeReceivables(data) {
  try {
    const tradeReceivablesData = data?.ReportData?.SchedulesAndDisclosuresFinancialsInfo?.TradeReceivablesAgeing;
    
    if (!tradeReceivablesData) {
      return null;
    }

    // Get years from the Unclassified section
    const years = tradeReceivablesData.Unclassified?.TotalTradeReceivables?.map(item => item.FinancialYear) || [];
    
    if (years.length === 0) {
      return null;
    }

    // Helper function to get amount for a specific year
    const getAmountForYear = (dataArray, year) => {
      if (!dataArray || dataArray.length === 0) return null;
      const item = dataArray.find(d => d.FinancialYear === year);
      return item ? item.Amount : null;
    };

    // Build rows structure
    const rows = [
      {
        name: "Due Exceeding 6 Months",
        isHeader: true,
        indent: 0
      },
      {
        name: "Net Trade Receivables due exceeding 6 Months",
        dataKey: "DueExceedingSixMonths.NetTradeReceivables",
        indent: 1
      },
      {
        name: "Due upto 6 Months",
        isHeader: true,
        indent: 0
      },
      {
        name: "Net Trade Receivables due upto 6 Months",
        dataKey: "DueUptoSixMonths.NetTradeReceivables",
        indent: 1
      },
      {
        name: "Unclassified",
        isHeader: true,
        indent: 0
      },
      {
        name: "Total Trade Receivables",
        dataKey: "Unclassified.TotalTradeReceivables",
        indent: 1,
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
          const dataArray = getValueFromPath(tradeReceivablesData, row.dataKey);
          rowData[year] = getAmountForYear(dataArray, year);
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
    console.error("Error extracting Trade Receivables data:", error);
    return null;
  }
}