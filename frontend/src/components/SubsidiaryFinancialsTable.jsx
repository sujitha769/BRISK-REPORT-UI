import React from 'react';

const SubsidiaryFinancialsTable = ({ data }) => {
  if (!data || data.rows.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        No subsidiary financials data available
      </div>
    );
  }

  const formatNumber = (num) => {
    if (num === null || num === undefined || num === 0) return '0.00';
    if (num === '-') return '-';
    return parseFloat(num).toFixed(2);
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

  const cellStyleRight = {
    ...cellStyle,
    textAlign: 'right'
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
        Subsidiary Financials Snapshot
      </div>

      <div style={{ fontSize: "10px", color: "#666", marginBottom: "12px", textAlign: "right" }}>
        Amount in Lacs
      </div>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#0b4ea2', color: '#fff' }}>
            <th style={headerStyle}>Subsidiary Name</th>
            <th style={headerStyle}>Year</th>
            <th style={headerStyle}>Country</th>
            <th style={headerStyle}>Shareholding%</th>
            <th style={headerStyle}>Share Capital</th>
            <th style={headerStyle}>Reserves</th>
            <th style={headerStyle}>Assets</th>
            <th style={headerStyle}>Income</th>
            <th style={headerStyle}>PAT</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr 
              key={index}
              style={{ 
                backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                borderBottom: '1px solid #e5e7eb'
              }}
            >
              <td style={cellStyle}>{row.SubsidiaryName}</td>
              <td style={cellStyle}>{row.FinancialYear}</td>
              <td style={cellStyle}>{row.Country}</td>
              <td style={cellStyleRight}>{formatNumber(row.ShareholdingPercentage)}</td>
              <td style={cellStyleRight}>{formatNumber(row.ShareCapital)}</td>
              <td style={{
                ...cellStyleRight,
                color: row.Reserves < 0 ? '#dc2626' : 'inherit'
              }}>
                {formatNumber(row.Reserves)}
              </td>
              <td style={cellStyleRight}>{formatNumber(row.Assets)}</td>
              <td style={cellStyleRight}>{formatNumber(row.Income)}</td>
              <td style={{
                ...cellStyleRight,
                color: row.PAT < 0 ? '#dc2626' : '#059669',
                fontWeight: 500
              }}>
                {formatNumber(row.PAT)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.warnings && data.warnings.length > 0 && (
        <div style={{ padding: '12px', backgroundColor: '#fef2f2', borderTop: '1px solid #fecaca', marginTop: '12px', borderRadius: '4px' }}>
          {data.warnings.map((warning, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: index < data.warnings.length - 1 ? '10px' : 0,
                fontSize: '11px',
                color: '#991b1b'
              }}
            >
              <span style={{ 
                marginRight: '6px', 
                fontSize: '14px',
                flexShrink: 0
              }}>
                🚩
              </span>
              <span>{warning.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubsidiaryFinancialsTable;