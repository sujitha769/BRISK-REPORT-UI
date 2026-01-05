import React from "react";

/**
 * Charges Profile Table Component
 * Simple two-column layout matching the Borrowings design
 */
function ChargesProfileTable({ data }) {
  if (!data || !data.charges || data.charges.length === 0) {
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
          Charges Profile Report
        </div>
        <p style={{ color: "#666", marginTop: "10px" }}>No charges profile data available</p>
      </div>
    );
  }

  const formatAmount = (amount) => {
    if (!amount) return "0.00";
    return parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const renderField = (label, value) => {
    return (
      <tr>
        <td style={{
          padding: '10px 12px',
          fontWeight: '600',
          color: '#333',
          backgroundColor: '#f8f9fa',
          border: '1px solid #ddd',
          width: '35%',
          verticalAlign: 'top',
          fontSize: '13px'
        }}>
          {label}
        </td>
        <td style={{
          padding: '10px 12px',
          color: '#555',
          border: '1px solid #ddd',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          verticalAlign: 'top',
          fontSize: '13px'
        }}>
          {value || '-'}
        </td>
      </tr>
    );
  };

  return (
    <div>
      {data.charges.map((charge, index) => (
        <div
          key={index}
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
          {/* Floating Badge with Charge ID */}
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
            Charge ID: {charge.chargeID}
          </div>

          {/* Data Table */}
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginTop: '0'
          }}>
            <tbody>
              {renderField('Charge Holder', charge.chargeHolder)}
              {renderField('Charge Amount', formatAmount(charge.chargeAmount))}
              {renderField('Charge Holder City', charge.chargeHolderCity)}
              {renderField('Charge Holder State', charge.chargeHolderState)}
              {renderField('Attachment Details', charge.attachmentDetails)}
              {renderField('List of attachments', 
                charge.listOfAttachments && charge.listOfAttachments.length > 0 
                  ? charge.listOfAttachments.join('\n') 
                  : '-'
              )}
              {renderField('Original Creation Date', charge.originalCreationDate)}
              {renderField('Modification', charge.modification)}
              {renderField('Consortium Finance', charge.consortiumFinance)}
              {renderField('Joint Charge', charge.jointCharge)}
              {renderField('Charge On', charge.chargeOn)}
              {renderField('Interest Rate Details', charge.interestRateDetails)}
              {renderField('Terms of repayment', charge.termsOfRepayment)}
              {renderField('Margin', charge.margin)}
              {renderField('Extent and operation of the charge', charge.extentAndOperation)}
              {renderField('Others Terms', charge.othersTerms)}
              {renderField('Short particulars of the property or asset(s) charged', charge.shortParticulars)}
              {renderField("Name of Person in case the said property is not registered in company's name", charge.nameOfPerson)}
              {renderField('Modification history', charge.modificationHistory)}
              
              {/* Download Link */}
              {charge.downloadChargeForm && (
                <tr>
                  <td style={{
                    padding: '10px 12px',
                    fontWeight: '600',
                    color: '#333',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    verticalAlign: 'top',
                    fontSize: '13px'
                  }}>
                    Download Charge Form
                  </td>
                  <td style={{
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    verticalAlign: 'top',
                    fontSize: '13px'
                  }}>
                    <a 
                      href={charge.downloadChargeForm} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#0066cc', textDecoration: 'underline' }}
                    >
                      Form CHG-1-04032021_signed%04-03-2021.pdf
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ChargesProfileTable;