import React from "react";

function formatNumber(val) {
  if (val === null || val === undefined) return "-";
  if (val < 0) return `(${Math.abs(val).toFixed(2)})`;
  return val.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function formatPercent(val) {
  if (val === null || val === undefined) return "-";
  return val.toFixed(2);
}

function CommonSizeBalanceSheetTable({ data }) {
  if (!data || data.length === 0) return null;

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
        Balance Sheet Analysis
      </div>

      <div style={{ fontSize: "10px", color: "#666", marginBottom: "12px", textAlign: "right" }}>
        Values in Lacs(Rs.)
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th rowSpan="2" style={th}>Elements</th>
            <th colSpan="2" style={th}>Actuals (values in Lacs)</th>
            <th colSpan="2" style={th}>Common Size (%)</th>
          </tr>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th style={th}>Standalone</th>
            <th style={th}>Consolidated</th>
            <th style={th}>Standalone %</th>
            <th style={th}>Consolidated %</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.label}>
              <td style={tdLeft}>{row.label}</td>
              <td style={td}>{formatNumber(row.standaloneValue)}</td>
              <td style={td}>{formatNumber(row.consolidatedValue)}</td>
              <td style={td}>{formatPercent(row.standalonePct)}</td>
              <td style={td}>{formatPercent(row.consolidatedPct)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommonSizeBalanceSheetTable;