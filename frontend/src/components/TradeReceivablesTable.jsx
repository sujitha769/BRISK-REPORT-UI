import React from "react";

function TradeReceivablesTable({ data }) {
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
        No Trade Receivables Ageing data available
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
      backgroundColor: row.isTotal ? "#e3f2fd" : (row.isHeader ? "#f5f5f5" : "#fff"),
      fontWeight: row.isBold || row.isTotal ? "bold" : "normal"
    };

    return baseStyle;
  };

  const getCellStyle = (isName, indent = 0) => {
    return {
      padding: "6px 8px",
      border: "1px solid #ddd",
      textAlign: isName ? "left" : "right",
      paddingLeft: isName ? `${8 + (indent * 15)}px` : "8px",
      verticalAlign: "top",
      fontSize: "11px"
    };
  };

  const thStyle = {
    padding: "6px 8px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "11px"
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #e5e7eb",
        padding: "16px",
        marginTop: "30px",
        borderRadius: "12px",
        background: "#ffffff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        width: "fit-content",
        minWidth: "100%"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10px",
          left: "16px",
          background: "#f8fafc",
          color: "#0d6efd",
          padding: "3px 8px",
          fontSize: "11px",
          fontWeight: "600",
          borderRadius: "6px",
          border: "1px solid #dbeafe",
        }}
      >
        Trade Receivables Ageing
      </div>

      <div style={{ fontSize: "10px", color: "#666", marginBottom: "12px", textAlign: "right" }}>
        Values in Lacs(Rs.)
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th style={{ 
              ...thStyle,
              minWidth: "200px"
            }}>
              Element Name
            </th>
            {years.map((year) => (
              <th key={year} style={{ 
                ...thStyle,
                textAlign: "right",
                minWidth: "100px"
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

export default TradeReceivablesTable;