import React from "react";

function formatNumber(value) {
  if (value === undefined || value === null) return "-";
  return (value / 100000).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function CashFlowConsolidatedTable({ data }) {
  if (!data) return null;

  const { years, rows } = data;

  const thStyle = {
    padding: "6px 8px",
    border: "1px solid #ddd",
    textAlign: "right",
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

  const tdLeft = {
    ...td,
    textAlign: "left",
    fontWeight: "400"
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
        Cash Flow Statement (Consolidated)
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
            <th style={{ ...thStyle, textAlign: "left", minWidth: "200px" }}>
              Element Name
            </th>
            {years.map((year) => (
              <th key={year} style={{ ...thStyle, minWidth: "100px" }}>
                {year}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td style={tdLeft}>{row.label}</td>

              {years.map((year) => (
                <td key={year} style={td}>
                  {formatNumber(row.values[year])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CashFlowConsolidatedTable;