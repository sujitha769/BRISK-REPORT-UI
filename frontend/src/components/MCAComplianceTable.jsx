import React from 'react';

function MCAComplianceTable({ data }) {
  if (!data || !data.years || !data.rows) {
    return (
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#f8f9fa", 
        border: "1px solid #dee2e6",
        borderRadius: "4px",
        color: "#6c757d",
        marginTop: "20px"
      }}>
        <p>MCA Compliance data is not available for this company</p>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    if (!status) return {};
    
    if (status === "Filed") {
      return { color: "#28a745", fontWeight: "500" };
    } else if (status.includes("Delayed")) {
      return { color: "#ffc107", fontWeight: "500" };
    } else if (status === "Not Filed") {
      return { color: "#dc3545", fontWeight: "500" };
    }
    return {};
  };

  return (
    <div style={{ marginTop: "40px" }}>
      {/* Tab-style heading */}
      <div style={{ 
        display: "inline-block",
        border: "1px solid #0b4ea2",
        borderBottom: "none",
        padding: "12px 24px",
        backgroundColor: "white",
        fontWeight: "600",
        fontSize: "16px"
      }}>
        MCA Annual Compliances
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th style={thStyle}>Annual Compliance</th>
            {data.years.map((year) => (
              <th key={year} style={thStyle}>
                {year}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9" }}>
              <td style={tdLabel}>{row.complianceType}</td>
              {data.years.map((year) => (
                <td key={year} style={{...tdValue, ...getStatusStyle(row.statuses[year])}}>
                  {row.statuses[year] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div style={{ marginTop: "15px", display: "flex", gap: "20px", fontSize: "13px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ color: "#28a745", fontWeight: "500" }}>●</span>
          <span>Filed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ color: "#ffc107", fontWeight: "500" }}>●</span>
          <span>Delayed Filed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ color: "#dc3545", fontWeight: "500" }}>●</span>
          <span>Not Filed</span>
        </div>
      </div>
    </div>
  );
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
  textAlign: "center",
  fontSize: "14px"
};

export default MCAComplianceTable;