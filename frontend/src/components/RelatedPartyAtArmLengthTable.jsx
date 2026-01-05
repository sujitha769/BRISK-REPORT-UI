import React from 'react';

const RelatedPartyAtArmLengthTable = ({ data }) => {
  const hasData = data && Array.isArray(data) && data.length > 0;

  const headerStyle = {
    padding: '6px 8px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '11px',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const cellStyle = {
    padding: '6px 8px',
    borderRight: '1px solid #e5e7eb',
    fontSize: '11px'
  };

  const cellStyleRight = {
    ...cellStyle,
    textAlign: 'right'
  };

  const formatAmount = (amount) => {
    if (amount === null || amount === undefined || amount === '') return '-';
    if (typeof amount === 'number') return amount.toFixed(2);
    return amount;
  };

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
        Related Party Material Transactions At Arm Length Price Schedule
      </div>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginTop: '8px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#0b4ea2', color: '#fff' }}>
            <th style={headerStyle}>Name Of The Related Party</th>
            <th style={headerStyle}>Financial Year</th>
            <th style={headerStyle}>Nature Of the Relationship</th>
            <th style={headerStyle}>Nature Of Transactions</th>
            <th style={headerStyle}>Amount Paid As Advance</th>
          </tr>
        </thead>
        <tbody>
          {!hasData ? (
            <tr>
              <td 
                colSpan="5" 
                style={{ 
                  padding: '16px', 
                  textAlign: 'center', 
                  color: '#666',
                  backgroundColor: '#f8f9fa',
                  fontSize: '11px'
                }}
              >
                There is no data available in this block.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr 
                key={index}
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                  borderBottom: '1px solid #e5e7eb'
                }}
              >
                <td style={cellStyle}>{row.NameOfTheRelatedParty || '-'}</td>
                <td style={cellStyle}>{row.FinancialYear || '-'}</td>
                <td style={cellStyle}>{row.NatureOftheRelationship || '-'}</td>
                <td style={cellStyle}>{row.NatureOfTransactions || '-'}</td>
                <td style={cellStyleRight}>{formatAmount(row.AmountPaidAsAdvance)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RelatedPartyAtArmLengthTable;