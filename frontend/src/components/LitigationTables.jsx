import React from "react";

/**
 * LitigationTables Component
 * Displays three litigation-related tables
 */
function LitigationTables({ data }) {
  if (!data) {
    return (
      <div style={{ padding: "20px", color: "#999" }}>
        No litigation data available
      </div>
    );
  }

  const headerStyle = {
    padding: '6px 8px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '11px',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const cellStyle = {
    padding: '6px 8px',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '11px',
    color: '#333'
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer'
  };

  const noDataStyle = {
    padding: '16px',
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    fontSize: '11px'
  };

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Table 1: Litigate Cases */}
      <div
        style={{
          position: "relative",
          border: "1px solid #e5e7eb",
          padding: "16px",
          marginBottom: "30px",
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
          Litigate Cases
        </div>

        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '8px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#0b4ea2', color: '#fff' }}>
              <th style={headerStyle}>Appeal</th>
              <th style={headerStyle}>Appellant</th>
              <th style={headerStyle}>Respondent</th>
              <th style={headerStyle}>Tribunal Bench</th>
              <th style={headerStyle}>Assessment Year</th>
              <th style={headerStyle}>Bench Allotted</th>
              <th style={headerStyle}>Case Status</th>
              <th style={{ ...headerStyle, borderRight: "none" }}>Tribunal Order Link</th>
            </tr>
          </thead>
          <tbody>
            {data.litigateCases && data.litigateCases.length > 0 ? (
              data.litigateCases.map((caseItem, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 1 ? '#f9f9f9' : '#fff' }}>
                  <td style={cellStyle}>{caseItem.appeal}</td>
                  <td style={cellStyle}>{caseItem.appellant}</td>
                  <td style={cellStyle}>{caseItem.respondent}</td>
                  <td style={cellStyle}>{caseItem.tribunalBench}</td>
                  <td style={cellStyle}>{caseItem.assessmentYear}</td>
                  <td style={cellStyle}>{caseItem.benchAllotted}</td>
                  <td style={cellStyle}>{caseItem.caseStatus}</td>
                  <td style={cellStyle}>
                    {caseItem.tribunalOrderLink ? (
                      <a 
                        href={caseItem.tribunalOrderLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={linkStyle}
                      >
                        Click
                      </a>
                    ) : (
                      "NA"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={noDataStyle}>
                  No litigate cases available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table 2: Suit Filed Cases and Wilful Defaulter - Historical */}
      <div
        style={{
          position: "relative",
          border: "1px solid #e5e7eb",
          padding: "16px",
          marginBottom: "30px",
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
          Suit Filed cases and Wilful Defaulter - Historical
        </div>

        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '8px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#0b4ea2', color: '#fff' }}>
              <th style={headerStyle}>Lender Name</th>
              <th style={headerStyle}>Branch</th>
              <th style={headerStyle}>Directors Named</th>
              <th style={headerStyle}>Reporting Period</th>
              <th style={headerStyle}>Amount Outstanding</th>
              <th style={{ ...headerStyle, borderRight: "none" }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {data.suitFiledCases && data.suitFiledCases.length > 0 ? (
              data.suitFiledCases.map((suitCase, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 1 ? '#f9f9f9' : '#fff' }}>
                  <td style={cellStyle}>{suitCase.lenderName}</td>
                  <td style={cellStyle}>{suitCase.branch}</td>
                  <td style={cellStyle}>{suitCase.directorsNamed}</td>
                  <td style={cellStyle}>{suitCase.reportingPeriod}</td>
                  <td style={cellStyle}>{suitCase.amountOutstanding}</td>
                  <td style={cellStyle}>{suitCase.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={noDataStyle}>
                  Suit Filed cases are not available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table 3: MCA Serious Complaints */}
      <div
        style={{
          position: "relative",
          border: "1px solid #e5e7eb",
          padding: "16px",
          marginBottom: "30px",
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
          MCA Serious Complaints
        </div>

        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '8px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#0b4ea2', color: '#fff' }}>
              <th style={headerStyle}>Complaint Type</th>
              <th style={headerStyle}>SRN</th>
              <th style={headerStyle}>Filing Date</th>
              <th style={{ ...headerStyle, borderRight: "none" }}>Complaint Status</th>
            </tr>
          </thead>
          <tbody>
            {data.mcaComplaints && data.mcaComplaints.length > 0 ? (
              data.mcaComplaints.map((complaint, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 1 ? '#f9f9f9' : '#fff' }}>
                  <td style={cellStyle}>{complaint.complaintType}</td>
                  <td style={cellStyle}>{complaint.srn}</td>
                  <td style={cellStyle}>{complaint.filingDate}</td>
                  <td style={cellStyle}>{complaint.complaintStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={noDataStyle}>
                  No MCA serious complaints available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LitigationTables;