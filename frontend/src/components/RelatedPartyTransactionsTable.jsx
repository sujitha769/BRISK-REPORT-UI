import React from 'react';

const RelatedPartyTransactionsTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        No related party transactions data available
      </div>
    );
  }

  const formatRelationship = (relationship) => {
    if (!relationship || relationship === '-1' || relationship === '-') return '-';
    
    // Map common relationship codes to readable text
    const relationshipMap = {
      '80': 'Associate',
      '81': 'Joint Venture',
      '162': 'Whole Time Director',
      '167': 'Company Secretary',
      'Subsidiary company': 'Subsidiary',
      'Key Management Personnel': 'KMP',
      'Relatives of Key management personnel': 'Relatives of KMP'
    };
    
    return relationshipMap[relationship] || relationship;
  };

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
        Related Party Transactions
      </div>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginTop: '8px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#0b4ea2', color: '#fff' }}>
            <th style={headerStyle}>Related Party</th>
            <th style={headerStyle}>Financial Year</th>
            <th style={headerStyle}>Country</th>
            <th style={headerStyle}>Nature of Relationship</th>
            <th style={headerStyle}>Description of transaction</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr 
              key={index}
              style={{ 
                backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                borderBottom: '1px solid #e5e7eb'
              }}
            >
              <td style={cellStyle}>{row.RelatedParty}</td>
              <td style={cellStyle}>{row.FinancialYear}</td>
              <td style={cellStyle}>{row.Country}</td>
              <td style={cellStyle}>{formatRelationship(row.NatureOfRelationship)}</td>
              <td style={cellStyle}>{row.DescriptionOfTransaction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RelatedPartyTransactionsTable;