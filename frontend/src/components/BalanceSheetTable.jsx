import React from 'react';

function BalanceSheetTable({ data }) {
  if (!data) return null;

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
        Balance Sheet (Standalone)
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <p style={{ color: "#666", margin: "0", fontSize: "14px" }}>
          Values in Lacs(Rs.)
        </p>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th style={thStyle}>Element Name</th>
            {data.years.map((year) => (
              <th key={year} style={thStyle}>
                {year}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.sections.map((section, i) => (
            <React.Fragment key={i}>
              {/* Section header */}
              <tr style={{ backgroundColor: "#d9f1f6" }}>
                <td colSpan={data.years.length + 1} style={sectionStyle}>
                  {section.title}
                </td>
              </tr>

              {/* Rows */}
              {section.rows.map((row, j) => (
                <tr key={j} style={{ backgroundColor: j % 2 === 0 ? "white" : "#f9f9f9" }}>
                  <td style={tdLabel}>{row.label}</td>
                  {data.years.map((year, idx) => (
                    <td key={idx} style={tdValue}>
                      {formatAmount(row.values[year])}
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

/* ---------- Helpers ---------- */
function formatAmount(value) {
  if (value === undefined || value === null) return "NA";
  return (value / 100000).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* ---------- Styles ---------- */
const thStyle = {
  padding: "12px 15px",
  border: "1px solid #0b4ea2",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "15px"
};

const tdLabel = {
  padding: "12px 15px",
  border: "1px solid #ddd",
  fontWeight: "500",
  fontSize: "14px"
};

const tdValue = {
  padding: "12px 15px",
  border: "1px solid #ddd",
  textAlign: "right",
  fontSize: "14px"
};

const sectionStyle = {
  padding: "10px 15px",
  fontWeight: "600",
  border: "1px solid #ddd",
  fontSize: "15px"
};

export default BalanceSheetTable;