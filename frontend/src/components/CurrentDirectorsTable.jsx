import React from 'react';

function CurrentDirectorsTable({ data }) {
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
          Current Directors
        </div>
        <p style={{ color: "#666", marginTop: "10px", fontSize: "13px" }}>No current directors found.</p>
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
        Current Directors
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>DIN</th>
              <th style={thStyle}>Designation</th>
              <th style={thStyle}>Appointment Date</th>
              <th style={thStyle}>Directorship Count</th>
              <th style={thStyle}>Disqualified u/s 164(2)</th>
              <th style={thStyle}>DinDeactivated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((director, index) => (
              <tr key={index}>
                <td style={tdStyle}>{director.Name}</td>
                <td style={tdStyle}>{director.DirectorDIN}</td>
                <td style={tdStyle}>{director.Designation}</td>
                <td style={tdStyle}>{director.AppointmentDate}</td>
                <td style={tdCenterStyle}>{director.DirectorshipCount}</td>
                <td style={tdCenterStyle}>{director.DisqualifiedUS164_2}</td>
                <td style={tdCenterStyle}>{director.DINStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurrentDirectorsTable;