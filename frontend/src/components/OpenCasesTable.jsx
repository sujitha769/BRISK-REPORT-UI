import React from "react";

const OpenCasesTable = ({ data }) => {
  if (!data || data.length === 0) {
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
          Open Cases
        </div>
        <p style={{ color: "#666", marginTop: "10px", fontSize: "13px" }}>No open cases available</p>
      </div>
    );
  }

  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "13px"
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    fontSize: "13px"
  };

  const tdBoldStyle = {
    ...tdStyle,
    fontWeight: "600"
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
        Open Cases
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "#fff" }}>
            <th style={thStyle}>Case No</th>
            <th style={thStyle}>Court</th>
            <th style={thStyle}>Petitioner</th>
            <th style={thStyle}>Respondent</th>
            <th style={thStyle}>Type (Name)</th>
            <th style={thStyle}>Order Link</th>
            <th style={thStyle}>Year</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td style={tdStyle}>{row.caseNo}</td>
              <td style={tdStyle}>{row.court}</td>
              <td style={tdBoldStyle}>{row.petitioner}</td>
              <td style={tdStyle}>{row.respondent}</td>
              <td style={tdStyle}>{row.type}</td>
              <td style={tdStyle}>
                {row.orderLink ? (
                  <a
                    href={row.orderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0066cc", textDecoration: "underline" }}
                  >
                    CaseReport
                  </a>
                ) : (
                  "—"
                )}
              </td>
              <td style={tdBoldStyle}>{row.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenCasesTable;