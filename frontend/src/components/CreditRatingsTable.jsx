import React from "react";

/**
 * CreditRatingsTable Component
 * Displays credit ratings in two separate tables
 */
function CreditRatingsTable({ data }) {
  if (!data) {
    return (
      <div style={{ padding: "20px", color: "#999" }}>
        No credit ratings data available
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
      {/* Credit Ratings assigned in last 1-year */}
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
          Credit Ratings assigned in last 1-year
        </div>

        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '8px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#0b4ea2', color: '#fff' }}>
              <th style={headerStyle}>Agency</th>
              <th style={headerStyle}>Rating Date</th>
              <th style={headerStyle}>Instrument Details</th>
              <th style={headerStyle}>Amount</th>
              <th style={headerStyle}>Rating Assigned</th>
              <th style={{ ...headerStyle, borderRight: "none" }}>Outlook</th>
            </tr>
          </thead>
          <tbody>
            {data.lastOneYear && data.lastOneYear.length > 0 ? (
              data.lastOneYear.map((rating, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 1 ? '#f9f9f9' : '#fff' }}>
                  <td style={cellStyle}>{rating.agency}</td>
                  <td style={cellStyle}>{rating.ratingDate}</td>
                  <td style={cellStyle}>
                    {rating.rationalLink ? (
                      <a 
                        href={rating.rationalLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={linkStyle}
                      >
                        {rating.instrumentDetails}
                      </a>
                    ) : (
                      rating.instrumentDetails
                    )}
                  </td>
                  <td style={cellStyle}>{rating.amount}</td>
                  <td style={cellStyle}>{rating.ratingAssigned}</td>
                  <td style={cellStyle}>{rating.outlook}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={noDataStyle}>
                  No credit ratings assigned in last 1-year
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Credit Ratings older than last 1-year */}
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
          Credit Ratings older than last 1-year
        </div>

        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '8px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#0b4ea2', color: '#fff' }}>
              <th style={headerStyle}>Agency</th>
              <th style={headerStyle}>Rating Date</th>
              <th style={headerStyle}>Instrument Details</th>
              <th style={headerStyle}>Amount</th>
              <th style={headerStyle}>Rating Assigned</th>
              <th style={{ ...headerStyle, borderRight: "none" }}>Outlook</th>
            </tr>
          </thead>
          <tbody>
            {data.olderThanOneYear && data.olderThanOneYear.length > 0 ? (
              data.olderThanOneYear.map((rating, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 1 ? '#f9f9f9' : '#fff' }}>
                  <td style={cellStyle}>{rating.agency}</td>
                  <td style={cellStyle}>{rating.ratingDate}</td>
                  <td style={cellStyle}>
                    {rating.rationalLink ? (
                      <a 
                        href={rating.rationalLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={linkStyle}
                      >
                        {rating.instrumentDetails}
                      </a>
                    ) : (
                      rating.instrumentDetails
                    )}
                  </td>
                  <td style={cellStyle}>{rating.amount}</td>
                  <td style={cellStyle}>{rating.ratingAssigned}</td>
                  <td style={cellStyle}>{rating.outlook}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={noDataStyle}>
                  No credit ratings older than last 1-year
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreditRatingsTable;