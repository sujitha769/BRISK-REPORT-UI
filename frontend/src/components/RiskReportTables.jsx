import React from "react";

function RiskReportTables({ piotroskiData, traditionalModelsData }) {
  if (!piotroskiData && !traditionalModelsData) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
        No Risk Report data available
      </div>
    );
  }

  const formatValue = (value) => {
    if (value === null || value === undefined) return "-";
    if (Number.isInteger(value)) {
      return value.toString();
    }
    return value.toFixed(2);
  };

  const tableHeaderStyle = {
    padding: "6px 8px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontWeight: "600",
    minWidth: "100px",
    fontSize: "11px"
  };

  const tableCellStyle = (isName, isBold = false) => ({
    padding: "6px 8px",
    border: "1px solid #ddd",
    textAlign: isName ? "left" : "center",
    backgroundColor: "#fff",
    fontWeight: isBold ? "bold" : "normal",
    fontSize: "11px"
  });

  const flagStyle = {
    padding: "8px 12px",
    marginTop: "10px",
    backgroundColor: "#fff3cd",
    border: "1px solid #ffc107",
    borderRadius: "4px",
    display: "flex",
    alignItems: "flex-start",
    gap: "6px"
  };

  const flagIconStyle = {
    color: "#dc3545",
    fontWeight: "bold",
    fontSize: "14px",
    flexShrink: 0,
    marginTop: "1px"
  };

  const flagTextStyle = {
    color: "#333",
    fontSize: "11px",
    lineHeight: "1.5",
    margin: 0
  };

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Piotroski's F-Score Section */}
      {piotroskiData && (
        <div
          style={{
            position: "relative",
            border: "1px solid #e5e7eb",
            padding: "16px",
            marginBottom: "40px",
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
            PIOTROSKI'S F-SCORE
          </div>

          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            marginTop: "8px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
                <th style={{ 
                  ...tableHeaderStyle, 
                  textAlign: "left",
                  minWidth: "200px"
                }}>
                  Test Name
                </th>
                {piotroskiData.years.map((year) => (
                  <th key={year} style={tableHeaderStyle}>
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {piotroskiData.tableData.map((row, index) => (
                <tr key={index}>
                  <td style={tableCellStyle(true, row.isBold)}>
                    {row.testName}
                  </td>
                  {row.data.map((value, idx) => (
                    <td key={idx} style={tableCellStyle(false, row.isBold)}>
                      {formatValue(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Red Flags for Piotroski */}
          {piotroskiData.redFlags && piotroskiData.redFlags.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              {piotroskiData.redFlags.map((flag, index) => (
                <div key={index} style={flagStyle}>
                  <span style={flagIconStyle}>🚩</span>
                  <p style={flagTextStyle}>{flag}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Traditional Models Section */}
      {traditionalModelsData && (
        <div
          style={{
            position: "relative",
            border: "1px solid #e5e7eb",
            padding: "16px",
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
            Other widely accepted Traditional Models
          </div>

          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            marginTop: "8px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
                <th style={{ 
                  ...tableHeaderStyle, 
                  textAlign: "left",
                  minWidth: "200px"
                }}>
                  Test Name
                </th>
                {traditionalModelsData.years.map((year) => (
                  <th key={year} style={tableHeaderStyle}>
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {traditionalModelsData.tableData.map((row, index) => (
                <tr key={index}>
                  <td style={tableCellStyle(true)}>
                    {row.testName}
                  </td>
                  {row.data.map((value, idx) => (
                    <td key={idx} style={tableCellStyle(false)}>
                      {formatValue(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Red Flags for Traditional Models */}
          {traditionalModelsData.redFlags && traditionalModelsData.redFlags.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              {traditionalModelsData.redFlags.map((flag, index) => (
                <div key={index} style={flagStyle}>
                  <span style={flagIconStyle}>🚩</span>
                  <p style={flagTextStyle}>{flag}</p>
                </div>
              ))}
            </div>
          )}

          {/* Green Flags for Traditional Models */}
          {traditionalModelsData.greenFlags && traditionalModelsData.greenFlags.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              {traditionalModelsData.greenFlags.map((flag, index) => (
                <div key={index} style={{
                  ...flagStyle,
                  backgroundColor: "#d4edda",
                  border: "1px solid #28a745"
                }}>
                  <span style={{ ...flagIconStyle, color: "#28a745" }}>✓</span>
                  <p style={flagTextStyle}>{flag}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RiskReportTables;