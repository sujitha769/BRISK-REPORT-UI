import React from 'react';

function FinancialTable({ data, title, subtitle }) {
  // Enhanced debugging
  console.log("FinancialTable received data:", data);
  console.log("FinancialTable received title:", title);
  
  if (!data) {
    console.error("FinancialTable: No data provided");
    return (
      <div style={{ marginTop: "40px", padding: "20px", border: "1px solid #f44336", backgroundColor: "#ffebee" }}>
        <h3>Error: No data provided to {title}</h3>
        <p>The data prop is null or undefined. Check if the API call succeeded and the transformation function returned data.</p>
      </div>
    );
  }

  if (!data.years || !data.sections) {
    console.error("FinancialTable: Invalid data structure", data);
    return (
      <div style={{ marginTop: "40px", padding: "20px", border: "1px solid #f44336", backgroundColor: "#ffebee" }}>
        <h3>Error: Invalid data structure for {title}</h3>
        <p>Expected structure: {'{ years: [], sections: [] }'}</p>
        <p>Received:</p>
        <pre style={{ fontSize: "12px", overflow: "auto", maxHeight: "200px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  }

  if (!data.sections.length) {
    return (
      <div style={{ marginTop: "40px", padding: "20px", border: "1px solid #ff9800", backgroundColor: "#fff3e0" }}>
        <h3>No sections available in {title}</h3>
        <p>The sections array is empty</p>
      </div>
    );
  }

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
        {title}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <p style={{ color: "#666", margin: "0", fontSize: "14px" }}>
          {subtitle || "Values in Lacs(Rs.)"}
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
            <th style={thStyle}>Y - O - Y</th>
          </tr>
        </thead>

        <tbody>
          {data.sections.map((section, i) => (
            <React.Fragment key={i}>
              {/* Section header */}
              <tr style={{ backgroundColor: "#d9f1f6" }}>
                <td colSpan={data.years.length + 2} style={sectionStyle}>
                  {section.title}
                </td>
              </tr>

              {/* Rows */}
              {section.rows.map((row, j) => {
                const yoyPercentage = calculateYOY(row.values, data.years);
                return (
                  <tr key={j} style={{ backgroundColor: j % 2 === 0 ? "white" : "#f9f9f9" }}>
                    <td style={tdLabel}>{row.label}</td>
                    {data.years.map((year) => (
                      <td key={year} style={tdValue}>
                        {formatAmount(row.values[year])}
                      </td>
                    ))}
                    <td style={tdValue}>{yoyPercentage}</td>
                  </tr>
                );
              })}
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
  const lacs = value / 100000;
  return lacs.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function calculateYOY(values, years) {
  if (years.length < 2) return "-";
  
  const lastYear = years[years.length - 1];
  const previousYear = years[years.length - 2];
  
  const lastValue = values[lastYear];
  const previousValue = values[previousYear];
  
  if (!lastValue || !previousValue || previousValue === 0) return "-";
  
  const percentageChange = ((lastValue - previousValue) / Math.abs(previousValue)) * 100;
  return percentageChange.toFixed(2) + "%";
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

export default FinancialTable;