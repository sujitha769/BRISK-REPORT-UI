import React from "react";

/**
 * Personal Guarantee Table Component
 * Displays personal guarantee information in a table format
 */
function PersonalGuaranteeTable({ data }) {
  if (!data) {
    return null;
  }

  const formatAmount = (amount) => {
    if (!amount) return "0.00";
    return parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

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
    textAlign: "left",
    verticalAlign: "top",
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
        Personal Guarantee
      </div>

      {!data.hasData || data.guarantees.length === 0 ? (
        // No data message
        <div>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#0b4ea2', color: 'white' }}>
                <th style={thStyle}>Charge Holder</th>
                <th style={thStyle}>Charge ID</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Outstanding years</th>
                <th style={thStyle}>Assets Secured</th>
                <th style={thStyle}>Personal Guarantee</th>
              </tr>
            </thead>
          </table>
          <div style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ddd',
            borderTop: 'none',
            color: '#666',
            fontSize: '13px'
          }}>
            There is no personal guarantee available.
          </div>
        </div>
      ) : (
        // Data table
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#0b4ea2', color: 'white' }}>
              <th style={thStyle}>Charge Holder</th>
              <th style={thStyle}>Charge ID</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Outstanding years</th>
              <th style={thStyle}>Assets Secured</th>
              <th style={thStyle}>Personal Guarantee</th>
            </tr>
          </thead>
          <tbody>
            {data.guarantees.map((guarantee, index) => (
              <tr key={index}>
                <td style={tdStyle}>{guarantee.chargeHolder}</td>
                <td style={tdStyle}>{guarantee.chargeID}</td>
                <td style={tdStyle}>{formatAmount(guarantee.amount)}</td>
                <td style={tdStyle}>{guarantee.outstandingYears}</td>
                <td style={tdStyle}>{guarantee.assetsSecured}</td>
                <td style={tdStyle}>{guarantee.personalGuarantee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PersonalGuaranteeTable;