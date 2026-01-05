import React from "react";

function formatNumber(value) {
  if (value === undefined || value === null) return "-";
  return (value / 100000).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function SectionRow({ title }) {
  return (
    <tr style={{ backgroundColor: "#d7f1f4", fontWeight: "600" }}>
      <td style={sectionTd} colSpan={20}>{title}</td>
    </tr>
  );
}

function BalanceSheetConsolidatedTable({ data }) {
  if (!data) return null;

  const { years, equityAndLiabilities, assets } = data;

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
        Balance Sheet (Consolidated)
      </div>

      <div style={{ fontSize: "10px", color: "#666", marginBottom: "12px", textAlign: "right" }}>
        Values in Lacs(Rs.)
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
          <SectionRow title="Equity and Liabilities" />
          {equityAndLiabilities.map((row) => (
            <tr key={row.label}>
              <td style={tdLeft}>{row.label}</td>
              {years.map((y) => (
                <td key={y} style={td}>
                  {formatNumber(row.values[y])}
                </td>
              ))}
            </tr>
          ))}

          <SectionRow title="Assets" />
          {assets.map((row) => (
            <tr key={row.label}>
              <td style={tdLeft}>{row.label}</td>
              {years.map((y) => (
                <td key={y} style={td}>
                  {formatNumber(row.values[y])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------- Styles -------- */
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

const sectionTd = {
  padding: "6px 8px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontSize: "11px"
};

export default BalanceSheetConsolidatedTable;