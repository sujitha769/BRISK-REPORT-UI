import React, { useState } from 'react';

function formatCurrency(value) {
  if (value === null || value === undefined) return '-';
  return value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

function RelatedCompaniesByDirectorsTable({ data }) {
  const [expandedCompany, setExpandedCompany] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '20px', marginTop: '20px' }}>
        <h2>Related Companies By Directors</h2>
        <p style={{ color: '#666' }}>No related companies found by directors.</p>
      </div>
    );
  }

  const toggleExpand = (index) => {
    setExpandedCompany(expandedCompany === index ? null : index);
  };

  const headerStyle = {
    padding: '6px 8px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '11px',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    border: '1px solid #ddd'
  };

  const cellStyle = {
    padding: '6px 8px',
    border: '1px solid #ddd',
    fontSize: '11px'
  };

  const cellStyleRight = {
    ...cellStyle,
    textAlign: 'right'
  };

  return (
    <div style={{ marginTop: '30px' }}>
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
          Related Companies By Directors
        </div>

        <div style={{ fontSize: '10px', color: '#666', marginBottom: '12px', textAlign: 'right' }}>
          Companies sharing common directors with the main entity
        </div>
        
        {/* Summary Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#0b4ea2', color: 'white' }}>
              <th style={headerStyle}>Company Name</th>
              <th style={headerStyle}>State</th>
              <th style={headerStyle}>Date Of Incorporation</th>
              <th style={headerStyle}>Company Status</th>
              <th style={headerStyle}>Industry</th>
              <th style={headerStyle}>PaidUp Capital</th>
            </tr>
          </thead>
          <tbody>
            {data.map((company, index) => (
              <tr 
                key={index} 
                style={{
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                  cursor: 'pointer'
                }}
                onClick={() => toggleExpand(index)}
              >
                <td style={cellStyle}>{company.companyName}</td>
                <td style={cellStyle}>{company.state}</td>
                <td style={cellStyle}>{company.dateOfIncorporation}</td>
                <td style={cellStyle}>{company.companyStatus}</td>
                <td style={cellStyle}>{company.industry}</td>
                <td style={cellStyleRight}>{company.paidupCapital.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded Details for Selected Company */}
      {expandedCompany !== null && (
        <div
          style={{
            position: "relative",
            border: "2px solid #0b4ea2",
            padding: "16px",
            marginTop: "20px",
            borderRadius: "12px",
            background: "#f8f9fa",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <h3 style={{
              color: '#0b4ea2',
              margin: 0,
              fontSize: '14px',
              fontWeight: 600
            }}>
              {data[expandedCompany].companyName}
            </h3>
            <button 
              onClick={() => setExpandedCompany(null)}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 10px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ✕
            </button>
          </div>
          
          <div style={{
            textAlign: 'right',
            color: '#666',
            fontSize: '10px',
            marginBottom: '12px'
          }}>
            Amount in Lacs(Rs.)
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{
                  padding: '6px 8px',
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>Directors</td>
                <td style={{
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }} colSpan="3">
                  {data[expandedCompany].directors.join(', ')}
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '6px 8px',
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ddd',
                  width: '25%',
                  fontSize: '11px'
                }}>Company CIN</td>
                <td style={{
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  width: '25%',
                  fontSize: '11px'
                }}>{data[expandedCompany].companyCIN}</td>
                <td style={{
                  padding: '6px 8px',
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ddd',
                  width: '25%',
                  fontSize: '11px'
                }}>State</td>
                <td style={{
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  width: '25%',
                  fontSize: '11px'
                }}>{data[expandedCompany].state}</td>
              </tr>
              <tr>
                <td style={{
                  padding: '6px 8px',
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>Financial Year</td>
                <td style={{
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>{data[expandedCompany].financialYear}</td>
                <td style={{
                  padding: '6px 8px',
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>Paid Up Capital</td>
                <td style={{
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>{formatCurrency(data[expandedCompany].paidupCapital)}</td>
              </tr>
              <tr>
                <td style={{
                  padding: '6px 8px',
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>Total Income</td>
                <td style={{
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>{formatCurrency(data[expandedCompany].totalIncome)}</td>
                <td style={{
                  padding: '6px 8px',
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>Total Expenditure</td>
                <td style={{
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>{formatCurrency(data[expandedCompany].totalExpenditure)}</td>
              </tr>
              <tr>
                <td style={{
                  padding: '6px 8px',
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>Reserves And Surplus</td>
                <td style={{
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>{formatCurrency(data[expandedCompany].reservesAndSurplus)}</td>
                <td style={{
                  padding: '6px 8px',
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>NetWorth</td>
                <td style={{
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  fontSize: '11px'
                }}>{formatCurrency(data[expandedCompany].networth)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RelatedCompaniesByDirectorsTable;