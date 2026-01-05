function EquityShareCapitalTable({ data }) {
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
        No Equity Share Capital - Reconciliation data available
      </div>
    );
  }

  const { years, data: tableData } = data;

  const formatValue = (value) => {
    if (value === null || value === undefined) return "-";
    if (value === 0) return "0.00";
    
    // Convert to lakhs and format with 2 decimal places
    const valueInLakhs = value / 100000;
    return valueInLakhs.toFixed(2);
  };

  const getRowStyle = (row) => {
    const baseStyle = {
      backgroundColor: row.isTotal ? "#e3f2fd" : (row.isHeader ? "#e0f7fa" : "#fff"),
      fontWeight: row.isBold || row.isTotal ? "bold" : "normal"
    };

    return baseStyle;
  };

  const getCellStyle = (isName, indent = 0) => {
    return {
      padding: "12px",
      border: "1px solid #ddd",
      textAlign: isName ? "left" : "right",
      paddingLeft: isName ? `${12 + (indent * 20)}px` : "12px"
    };
  };

  return (
    <div style={{ marginTop: "30px", overflowX: "auto" }}>
      <h1 style={{ marginBottom: "16px", fontSize: "24px", fontWeight: "bold" }}>
        Equity Share Capital - Reconciliation
      </h1>
      
      <p style={{ marginBottom: "12px", color: "#666", fontSize: "14px" }}>
        Values in Lacs(Rs.)
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
        <thead>
          <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
            <th style={{ 
              padding: "14px", 
              border: "1px solid #1565c0", 
              textAlign: "left",
              fontWeight: "bold",
              minWidth: "300px"
            }}>
              Element Name
            </th>
            {years.map((year) => (
              <th key={year} style={{ 
                padding: "14px", 
                border: "1px solid #1565c0", 
                textAlign: "right",
                fontWeight: "bold",
                minWidth: "150px"
              }}>
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} style={getRowStyle(row)}>
              <td style={getCellStyle(true, row.indent)}>
                {row.elementName}
              </td>
              {years.map((year) => (
                <td key={year} style={getCellStyle(false)}>
                  {formatValue(row[year])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquityShareCapitalTable;