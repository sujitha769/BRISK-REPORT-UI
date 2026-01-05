import React from "react";

function AuditorKYCTable({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  const thStyle = {
    backgroundColor: "#0b4ea2",
    color: "white",
    padding: "6px 8px",
    textAlign: "left",
    fontWeight: "600",
    border: "1px solid #ddd",
    fontSize: "11px"
  };

  const tdStyle = {
    padding: "6px 8px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontSize: "11px"
  };

  const rowStyle = (index) => ({
    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white"
  });

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
        Auditors KYC and Details
      </div>

      <table style={{ 
        width: "100%", 
        borderCollapse: "collapse",
        marginTop: "8px"
      }}>
        <thead>
          <tr>
            <th style={thStyle}>Firm Name</th>
            <th style={thStyle}>Year</th>
            <th style={thStyle}>Reg No</th>
            <th style={thStyle}>Auditor Name</th>
            <th style={thStyle}>Membership</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>PAN</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={rowStyle(index)}>
              <td style={tdStyle}>{row.firmName}</td>
              <td style={tdStyle}>{row.year}</td>
              <td style={tdStyle}>{row.regNo}</td>
              <td style={tdStyle}>{row.auditorName}</td>
              <td style={tdStyle}>{row.membership}</td>
              <td style={tdStyle}>{row.address}</td>
              <td style={tdStyle}>{row.pan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditorKYCTable;