import React from "react";

/**
 * Component to display Charges List Tables (Open and Satisfied)
 * @param {Object} props - Component props
 * @param {Object} props.data - Charges data object
 */
function ChargesTables({ data }) {
  if (!data) {
    return <p>No Charges data available</p>;
  }

  const { rawOpenCharges, rawSatisfiedCharges } = data;

  // Helper function to format amounts in Lacs
  const formatAmount = (value) => {
    if (!value) return "0.00";
    return (value / 100000000).toFixed(2);
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

  const amountCellStyle = {
    ...tdStyle,
    textAlign: "right"
  };

  const totalRowStyle = {
    ...tdStyle,
    fontWeight: "600",
    backgroundColor: "#f5f5f5"
  };

  const totalAmountStyle = {
    ...amountCellStyle,
    fontWeight: "600",
    backgroundColor: "#f5f5f5"
  };

  const grandTotalRowStyle = {
    ...tdStyle,
    fontWeight: "700",
    backgroundColor: "#0b4ea2",
    color: "white"
  };

  const grandTotalAmountStyle = {
    ...amountCellStyle,
    fontWeight: "700",
    backgroundColor: "#0b4ea2",
    color: "white"
  };

  // Render Open Charges Table
  const renderOpenChargesTable = () => {
    if (!rawOpenCharges || rawOpenCharges.length === 0) {
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
            Open Charges List (Individual and Bank Wise)
          </div>
          <p style={{ color: "#666", marginTop: "10px" }}>No open charges available</p>
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
          Open Charges List (Individual and Bank Wise)
        </div>

        <div style={{ fontSize: "12px", color: "#666", marginBottom: "16px", textAlign: "right" }}>
          Values in Lacs(Rs.)
        </div>
        
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
              <th style={thStyle}>Charge Holder</th>
              <th style={thStyle}>Charge ID</th>
              <th style={thStyle}>Creation Date</th>
              <th style={thStyle}>Outstanding years</th>
              <th style={thStyle}>Modification Date</th>
              <th style={{...thStyle, textAlign: "right"}}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {rawOpenCharges.map((charge, index) => {
              const isTotal = charge.ChargeHolder.includes('Total Charge');
              const isGrandTotal = charge.ChargeHolder.includes('Sum of all Charges');
              
              if (isGrandTotal) {
                return (
                  <tr key={index}>
                    <td style={grandTotalRowStyle} colSpan="5">{charge.ChargeHolder}</td>
                    <td style={grandTotalAmountStyle}>{formatAmount(charge.Amount)}</td>
                  </tr>
                );
              }
              
              if (isTotal) {
                return (
                  <tr key={index}>
                    <td style={totalRowStyle} colSpan="5">{charge.ChargeHolder}</td>
                    <td style={totalAmountStyle}>{formatAmount(charge.Amount)}</td>
                  </tr>
                );
              }
              
              return (
                <tr key={index}>
                  <td style={tdStyle}>{charge.ChargeHolder}</td>
                  <td style={tdStyle}>{charge.ChargeCode || '-'}</td>
                  <td style={tdStyle}>{charge.DateOfCreation || '-'}</td>
                  <td style={tdStyle}>
                    {charge.OutstandingYears ? `${charge.OutstandingYears} Years` : '-'}
                  </td>
                  <td style={tdStyle}>{charge.DateOfLastModification || '-'}</td>
                  <td style={amountCellStyle}>{formatAmount(charge.Amount)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // Render Satisfied Charges Table
  const renderSatisfiedChargesTable = () => {
    if (!rawSatisfiedCharges || rawSatisfiedCharges.length === 0) {
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
            Satisfied Charges List (Individual and Bank Wise)
          </div>
          <p style={{ color: "#666", marginTop: "10px" }}>No satisfied charges available</p>
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
          Satisfied Charges List (Individual and Bank Wise)
        </div>

        <div style={{ fontSize: "12px", color: "#666", marginBottom: "16px", textAlign: "right" }}>
          Values in Lacs(Rs.)
        </div>
        
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
              <th style={thStyle}>Charge Holder</th>
              <th style={thStyle}>Charge ID</th>
              <th style={thStyle}>Creation Date</th>
              <th style={thStyle}>Outstanding years</th>
              <th style={thStyle}>Satisfaction Date</th>
              <th style={{...thStyle, textAlign: "right"}}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {rawSatisfiedCharges.map((charge, index) => {
              const isTotal = charge.ChargeHolder.includes('Total Charge');
              const isGrandTotal = charge.ChargeHolder.includes('Sum of all Charges');
              
              if (isGrandTotal) {
                return (
                  <tr key={index}>
                    <td style={grandTotalRowStyle} colSpan="5">{charge.ChargeHolder}</td>
                    <td style={grandTotalAmountStyle}>{formatAmount(charge.Amount)}</td>
                  </tr>
                );
              }
              
              if (isTotal) {
                return (
                  <tr key={index}>
                    <td style={totalRowStyle} colSpan="5">{charge.ChargeHolder}</td>
                    <td style={totalAmountStyle}>{formatAmount(charge.Amount)}</td>
                  </tr>
                );
              }
              
              return (
                <tr key={index}>
                  <td style={tdStyle}>{charge.ChargeHolder}</td>
                  <td style={tdStyle}>{charge.ChargeCode || '-'}</td>
                  <td style={tdStyle}>{charge.DateOfCreation || '-'}</td>
                  <td style={tdStyle}>
                    {charge.OutstandingYears ? `${charge.OutstandingYears} Years` : '-'}
                  </td>
                  <td style={tdStyle}>{charge.DateOfLastModification || '-'}</td>
                  <td style={amountCellStyle}>{formatAmount(charge.Amount)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {renderOpenChargesTable()}
      {renderSatisfiedChargesTable()}
    </div>
  );
}

export default ChargesTables;