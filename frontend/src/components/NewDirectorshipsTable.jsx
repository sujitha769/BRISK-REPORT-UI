import React from 'react';

function NewDirectorshipsTable({ data }) {
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
          New Directorships
        </div>
        <p style={{ color: "#666", marginTop: "10px", fontSize: "13px" }}>No new directorships found.</p>
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

  const tdCenterStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontSize: "13px"
  };

  const tdRightStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "right",
    fontSize: "13px"
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
        New Directorships
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
              <th style={thStyle}>Director Name</th>
              <th style={thStyle}>Company Name</th>
              <th style={thStyle}>Incorporation Date</th>
              <th style={thStyle}>Industry</th>
              <th style={thStyle}>State</th>
              <th style={thStyle}>Paid-up Capital (₹)</th>
              <th style={thStyle}>Common Directors</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.DirectorName}</td>
                <td style={tdStyle}>{item.CompanyName}</td>
                <td style={tdStyle}>{item.IncorporationDate}</td>
                <td style={tdStyle}>{item.Industry}</td>
                <td style={tdCenterStyle}>{item.State}</td>
                <td style={tdRightStyle}>
                  {item.PaidupCapital?.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td style={tdCenterStyle}>{item.CommonDirectors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewDirectorshipsTable;