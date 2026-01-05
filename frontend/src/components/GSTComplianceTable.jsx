import React from "react";

/**
 * GSTComplianceTable Component
 * Displays GST Compliance filing status for latest 6 months
 */
function GSTComplianceTable({ data }) {
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div style={{ padding: "20px", color: "#999" }}>
        No GST compliance data available
      </div>
    );
  }

  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px"
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    verticalAlign: "top",
    fontSize: "14px"
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #e5e7eb",
        padding: "24px",
        marginTop: "30px",
        borderRadius: "12px",
        background: "#ffffff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-12px",
          left: "16px",
          background: "#f8fafc",
          color: "#0d6efd",
          padding: "4px 10px",
          fontSize: "13px",
          fontWeight: "600",
          borderRadius: "6px",
          border: "1px solid #dbeafe",
        }}
      >
        GST Compliance - Latest 6 months filing status
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th style={thStyle}>GSTIN</th>
            <th style={thStyle}>State</th>
            {data.months.map((month, index) => (
              <th key={index} style={thStyle}>
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ ...tdStyle, fontWeight: "500" }}>{row.gstin}</td>
              <td style={tdStyle}>{row.state}</td>
              {data.months.map((month, colIndex) => (
                <td key={colIndex} style={tdStyle}>
                  {row.filingStatuses[month] || "Not Available"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GSTComplianceTable;