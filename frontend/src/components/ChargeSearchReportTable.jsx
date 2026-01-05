import React from 'react';

function ChargeSearchReportTable({ data }) {
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
        <p>Charge Search Report data is not available for this company</p>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    if (!amount) return '-';
    // Convert to Lakhs and format
    const lakhs = amount / 100000;
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(lakhs);
  };

  const formatYears = (years) => {
    if (!years) return '-';
    return `${years} Years`;
  };

  // Check if there are charges outstanding for more than 10 years
  const hasLongOutstanding = data.longOutstandingCharges && 
                             data.longOutstandingCharges.length > 0;

  // Find the oldest charge for warning message
  const oldestCharge = hasLongOutstanding 
    ? data.longOutstandingCharges.reduce((oldest, current) => 
        current.OutstandingYears > oldest.OutstandingYears ? current : oldest
      )
    : null;

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
    <div>
      {/* Warning Message for Long Outstanding Charges */}
      {hasLongOutstanding && oldestCharge && (
        <div style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderLeft: "4px solid #dc3545",
          padding: "15px",
          marginTop: "30px",
          marginBottom: "20px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px"
        }}>
          <span style={{ color: "#dc3545", fontSize: "20px", fontWeight: "bold" }}>🚩</span>
          <div style={{ flex: 1 }}>
            <strong style={{ color: "#856404" }}>Warning: </strong>
            <span style={{ color: "#856404" }}>
              The Charge amounting Rs.{formatCurrency(oldestCharge.Amount)} Lakhs is outstanding 
              for more than 10 years (Creation Date: {oldestCharge.DateOfCreation}). 
              It is recommended to further analyse these charges, for repayment terms with lender 
              and its closure in MCA records.
            </span>
          </div>
        </div>
      )}

      {/* Open Charges Section */}
      <div style={{ marginTop: "40px" }}>
        {/* Tab-style heading */}
        <div style={{ 
          display: "inline-block",
          border: "1px solid #0b4ea2",
          borderBottom: "none",
          padding: "12px 24px",
          backgroundColor: "white",
          fontWeight: "600",
          fontSize: "15px",
          color: "#0b4ea2"
        }}>
          Open Charges List (Individual and Bank Wis3e)
        </div>

        <div style={{ 
          border: "1px solid #ddd", 
          borderTop: "none",
          padding: "10px 15px",
          fontSize: "12px", 
          color: "#666", 
          textAlign: "right",
          backgroundColor: "#f9f9f9"
        }}>
          Amount in Lacs(Rs.)
        </div>
        
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
            borderTop: "none"
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
              <th style={thStyle}>Charge Holder</th>
              <th style={thStyle}>Charge ID</th>
              <th style={thStyle}>Creation Date</th>
              <th style={thStyle}>Outstanding Years</th>
              <th style={thStyle}>Last Modification Date</th>
              <th style={thStyle}>Assets Secured</th>
              <th style={{...thStyle, textAlign: "right"}}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.openCharges.length > 0 ? (
              <>
                {data.openCharges.map((charge, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{charge.ChargeHolder || '-'}</td>
                    <td style={tdStyle}>{charge.ChargeCode || '-'}</td>
                    <td style={tdStyle}>{charge.DateOfCreation || '-'}</td>
                    <td style={{...tdStyle, textAlign: "center"}}>
                      {formatYears(charge.OutstandingYears)}
                    </td>
                    <td style={tdStyle}>{charge.DateOfLastModification || '-'}</td>
                    <td style={tdStyle}>{charge.AssetsSecured || '-'}</td>
                    <td style={{...tdStyle, textAlign: "right", fontWeight: "500"}}>
                      {formatCurrency(charge.Amount)}
                    </td>
                  </tr>
                ))}
                {/* Total Rows */}
                {data.openChargesTotals.map((total, index) => (
                  <tr key={`total-${index}`} style={{ 
                    backgroundColor: "#f5f5f5"
                  }}>
                    <td style={{...tdStyle, fontWeight: "600"}}>
                      {total.ChargeHolder}
                    </td>
                    <td style={tdStyle}>-</td>
                    <td style={tdStyle}>-</td>
                    <td style={tdStyle}>-</td>
                    <td style={tdStyle}>-</td>
                    <td style={tdStyle}>-</td>
                    <td style={{...tdStyle, textAlign: "right", fontWeight: "600", color: "#0b4ea2"}}>
                      {formatCurrency(total.Amount)}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="7" style={{ ...tdStyle, textAlign: "center", color: "#999" }}>
                  No open charges available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Satisfied Charges Section */}
      {data.satisfiedCharges && data.satisfiedCharges.length > 0 && (
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
            Satisfied Charges
          </div>

          <div style={{ fontSize: "12px", color: "#666", marginBottom: "16px", textAlign: "right" }}>
            Amount in Lacs(Rs.)
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
              borderTop: "none"
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
                <th style={thStyle}>Charge Holder</th>
                <th style={thStyle}>Charge ID</th>
                <th style={thStyle}>Creation Date</th>
                <th style={thStyle}>Satisfaction Date</th>
                <th style={thStyle}>Assets Secured</th>
                <th style={{...thStyle, textAlign: "right"}}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.satisfiedCharges.map((charge, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{charge.ChargeHolder || '-'}</td>
                  <td style={tdStyle}>{charge.ChargeCode || '-'}</td>
                  <td style={tdStyle}>{charge.DateOfCreation || '-'}</td>
                  <td style={tdStyle}>{charge.DateOfLastModification || '-'}</td>
                  <td style={tdStyle}>{charge.AssetsSecured || '-'}</td>
                  <td style={{...tdStyle, textAlign: "right", fontWeight: "500"}}>
                    {formatCurrency(charge.Amount)}
                  </td>
                </tr>
              ))}
              {/* Total Rows */}
              {data.satisfiedChargesTotals.map((total, index) => (
                <tr key={`total-${index}`} style={{ 
                  backgroundColor: "#f5f5f5"
                }}>
                  <td style={{...tdStyle, fontWeight: "600"}}>
                    {total.ChargeHolder}
                  </td>
                  <td style={tdStyle}>-</td>
                  <td style={tdStyle}>-</td>
                  <td style={tdStyle}>-</td>
                  <td style={tdStyle}>-</td>
                  <td style={{...tdStyle, textAlign: "right", fontWeight: "600", color: "#0b4ea2"}}>
                    {formatCurrency(total.Amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ChargeSearchReportTable;