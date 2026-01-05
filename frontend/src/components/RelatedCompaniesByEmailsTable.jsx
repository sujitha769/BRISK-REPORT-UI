// FILE: src/components/RelatedCompaniesByEmailsTable.jsx

import { useState } from 'react';
import { formatCurrency } from '../services/extractRelatedCompanies';

function RelatedCompaniesByEmailsTable({ data }) {
  const [expandedCompany, setExpandedCompany] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '20px', marginTop: '20px' }}>
        <h2>Related Companies By Email</h2>
        <p style={{ color: '#666' }}>No related companies found by email.</p>
      </div>
    );
  }

  const toggleExpand = (index) => {
    setExpandedCompany(expandedCompany === index ? null : index);
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ marginBottom: '10px' }}>Related Companies By Email</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Companies sharing common email addresses with the main entity
      </p>
      
      {/* Summary Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Company Name</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>State</th>
              <th style={styles.th}>Date Of Incorporation</th>
              <th style={styles.th}>Company Status</th>
              <th style={styles.th}>PaidUp Capital</th>
            </tr>
          </thead>
          <tbody>
            {data.map((company, index) => (
              <tr 
                key={index} 
                style={styles.row}
                onClick={() => toggleExpand(index)}
              >
                <td style={styles.td}>{company.companyName}</td>
                <td style={styles.td}>{company.city}</td>
                <td style={styles.td}>{company.state}</td>
                <td style={styles.td}>{company.dateOfIncorporation}</td>
                <td style={styles.td}>{company.companyStatus}</td>
                <td style={styles.tdRight}>{company.paidupCapital.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded Details for Selected Company */}
      {expandedCompany !== null && (
        <div style={styles.detailCard}>
          <div style={styles.detailHeader}>
            <h3 style={styles.detailTitle}>
              {data[expandedCompany].companyName}
            </h3>
            <button 
              onClick={() => setExpandedCompany(null)}
              style={styles.closeButton}
            >
              ✕
            </button>
          </div>
          
          <div style={styles.detailSubheader}>
            Rounding Value: Amount in Lacs(Rs.)
          </div>

          <table style={styles.detailTable}>
            <tbody>
              <tr>
                <td style={styles.detailLabel}>Common Emails</td>
                <td style={styles.detailValue} colSpan="3">
                  {data[expandedCompany].emails.join(', ')}
                </td>
              </tr>
              <tr>
                <td style={styles.detailLabel}>Company CIN</td>
                <td style={styles.detailValue}>{data[expandedCompany].companyCIN}</td>
                <td style={styles.detailLabel}>State</td>
                <td style={styles.detailValue}>{data[expandedCompany].state}</td>
              </tr>
              <tr>
                <td style={styles.detailLabel}>Financial Year</td>
                <td style={styles.detailValue}>{data[expandedCompany].financialYear}</td>
                <td style={styles.detailLabel}>Paid Up Capital</td>
                <td style={styles.detailValue}>{formatCurrency(data[expandedCompany].paidupCapital)}</td>
              </tr>
              <tr>
                <td style={styles.detailLabel}>Total Income</td>
                <td style={styles.detailValue}>{formatCurrency(data[expandedCompany].totalIncome)}</td>
                <td style={styles.detailLabel}>Total Expenditure</td>
                <td style={styles.detailValue}>{formatCurrency(data[expandedCompany].totalExpenditure)}</td>
              </tr>
              <tr>
                <td style={styles.detailLabel}>Reserves And Surplus</td>
                <td style={styles.detailValue}>{formatCurrency(data[expandedCompany].reservesAndSurplus)}</td>
                <td style={styles.detailLabel}>NetWorth</td>
                <td style={styles.detailValue}>{formatCurrency(data[expandedCompany].networth)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    backgroundColor: 'white'
  },
  headerRow: {
    backgroundColor: '#004080',
    color: 'white'
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    border: '1px solid #ddd'
  },
  row: {
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  td: {
    padding: '10px 12px',
    border: '1px solid #ddd'
  },
  tdRight: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    textAlign: 'right'
  },
  detailCard: {
    marginTop: '20px',
    border: '2px solid #004080',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f8f9fa'
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  detailTitle: {
    color: '#004080',
    margin: 0,
    fontSize: '20px'
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 12px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  detailSubheader: {
    textAlign: 'right',
    color: '#666',
    fontSize: '14px',
    marginBottom: '15px'
  },
  detailTable: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  detailLabel: {
    padding: '10px',
    fontWeight: 'bold',
    backgroundColor: '#e9ecef',
    border: '1px solid #ddd',
    width: '25%'
  },
  detailValue: {
    padding: '10px',
    border: '1px solid #ddd',
    width: '25%'
  }
};

export default RelatedCompaniesByEmailsTable;