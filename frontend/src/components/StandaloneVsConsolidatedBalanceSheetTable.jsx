import React from "react";

function formatValue(value) {
  if (value === null || value === undefined) return "-";
  if (Math.abs(value) > 1000) {
    return (value / 100000).toLocaleString("en-IN");
  }
  return value.toFixed(2);
}

function StandaloneVsConsolidatedBalanceSheetTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const years = data[0].rows.map((r) => r.FinancialYear);

  const th = {
    padding: "6px 8px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "11px"
  };

  const td = {
    padding: "6px 8px",
    border: "1px solid #ddd",
    textAlign: "right",
    verticalAlign: "top",
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
        Balance Sheet Analysis
      </div>

      <div style={{ fontSize: "10px", color: "#666", marginBottom: "12px", textAlign: "right" }}>
        Values in Lacs(Rs.)
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
          <thead>
            <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
              <th style={{ ...th, textAlign: "left", minWidth: "200px" }}>
                Element Name
              </th>
              {years.map((y) => (
                <th key={y} style={{ ...th, minWidth: "100px" }}>
                  {y}
                </th>
              ))}
              <th style={{ ...th, minWidth: "80px" }}>Y-O-Y</th>
            </tr>
          </thead>

          <tbody>
            {data.map((section) => (
              <React.Fragment key={section.label}>
                {/* Section header */}
                <tr style={{ backgroundColor: "#d7f1f4", fontWeight: 600 }}>
                  <td style={{ ...td, textAlign: "left" }} colSpan={years.length + 2}>
                    {section.label}
                  </td>
                </tr>

                {/* Standalone row */}
                <tr>
                  <td style={{ ...td, textAlign: "left" }}>Standalone</td>
                  {section.rows.map((r) => (
                    <td key={r.FinancialYear} style={td}>
                      {formatValue(r.Standalone)}
                    </td>
                  ))}
                  <td style={td}>-</td>
                </tr>

                {/* Consolidated row */}
                <tr>
                  <td style={{ ...td, textAlign: "left" }}>Consolidated</td>
                  {section.rows.map((r) => (
                    <td key={r.FinancialYear} style={td}>
                      {formatValue(r.Consolidated)}
                    </td>
                  ))}
                  <td style={td}>-</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default StandaloneVsConsolidatedBalanceSheetTable;