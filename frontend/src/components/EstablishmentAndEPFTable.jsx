import React from 'react';

function EstablishmentAndEPFTable({ data }) {
  if (!data) {
    return (
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#f8f9fa", 
        border: "1px solid #dee2e6",
        borderRadius: "4px",
        color: "#6c757d",
        marginTop: "20px"
      }}>
        <p>Establishment and EPF data is not available for this company</p>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (!num) return '-';
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px"
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    verticalAlign: "top",
    fontSize: "14px"
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
        Establishment Details
      </div>

      {/* Establishment Details Table */}
      <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
              <th style={thStyle}>Establishment Name</th>
              <th style={thStyle}>Establishment Code</th>
              <th style={thStyle}>City</th>
              <th style={thStyle}>State</th>
              <th style={thStyle}>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {data.establishments.length > 0 ? (
              data.establishments.map((est, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{est.EstablishmentName || '-'}</td>
                  <td style={tdStyle}>{est.EstablishmentCode || '-'}</td>
                  <td style={tdStyle}>{est.City || '-'}</td>
                  <td style={tdStyle}>{est.State || '-'}</td>
                  <td style={tdStyle}>{est.Pincode || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ ...tdStyle, textAlign: "center", color: "#999" }}>
                  No establishment details available
                </td>
              </tr>
            )}
          </tbody>
        </table>

      {/* Employment Trends Section */}
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
          Employment Trends
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
              <th style={thStyle}>Month-Year</th>
              <th style={thStyle}>Total Employees</th>
              <th style={thStyle}>EPF Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {data.employmentTrends.length > 0 ? (
              data.employmentTrends.map((trend, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{trend.MonthYear || '-'}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    {formatNumber(trend.TotalEmployees)}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    {formatCurrency(trend.EPFAmountPaid)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ ...tdStyle, textAlign: "center", color: "#999" }}>
                  No employment trends available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EstablishmentAndEPFTable;