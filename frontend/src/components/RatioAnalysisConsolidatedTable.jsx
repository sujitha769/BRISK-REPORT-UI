import React from "react";

function formatValue(value) {
  if (value === undefined || value === null) return "-";
  if (value < 0) return `(${Math.abs(value).toFixed(2)})`;
  return value.toFixed(2);
}

function SectionRow({ title, colSpan }) {
  return (
    <tr style={{ backgroundColor: "#d7f1f4", fontWeight: 600 }}>
      <td style={sectionTd} colSpan={colSpan}>{title}</td>
    </tr>
  );
}

function RatioAnalysisConsolidatedTable({ data }) {
  if (!data) return null;

  const { years, sections } = data;

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
        Ratio Analysis (Consolidated)
      </div>

      <div style={{ fontSize: "10px", color: "#666", marginBottom: "12px", textAlign: "right" }}>
        Values in Ratios
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
          </tr>
        </thead>

        <tbody>
          {sections.map((section) => (
            <React.Fragment key={section.title}>
              <SectionRow
                title={section.title}
                colSpan={years.length + 1}
              />

              {section.rows.map((row) => (
                <tr key={row.label}>
                  <td style={tdLeft}>{row.label}</td>
                  {years.map((y) => (
                    <td key={`${row.label}-${y}`} style={td}>
                      {formatValue(row.values[y])}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
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

export default RatioAnalysisConsolidatedTable;