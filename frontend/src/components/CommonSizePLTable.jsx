import React from "react";

/**
 * Component to display Common Size Profit & Loss Account Analysis
 * @param {Object} props - Component props
 * @param {Object} props.data - Common size P&L data object
 */
function CommonSizePLTable({ data }) {
  if (!data) {
    return <p>No Common Size P&L Account Analysis data available</p>;
  }

  // Helper function to format amounts in Lacs
  const formatAmount = (value) => {
    return (value / 100000000).toFixed(2);
  };

  // Helper function to format percentages
  const formatPercent = (value) => {
    return value.toFixed(2);
  };

  const headerStyle = {
    backgroundColor: "#0b4ea2",
    color: "white",
    padding: "6px 8px",
    textAlign: "center",
    fontWeight: "600",
    border: "1px solid #ddd",
    fontSize: "11px"
  };

  const subHeaderStyle = {
    backgroundColor: "#0b4ea2",
    color: "white",
    padding: "6px 8px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "11px",
    border: "1px solid #ddd"
  };

  const elementHeaderStyle = {
    backgroundColor: "#0b4ea2",
    color: "white",
    padding: "6px 8px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "11px",
    border: "1px solid #ddd"
  };

  const cellStyle = {
    padding: "6px 8px",
    textAlign: "right",
    border: "1px solid #ddd",
    backgroundColor: "#ffffff",
    fontSize: "11px"
  };

  const rowLabelStyle = {
    ...cellStyle,
    textAlign: "left",
    fontWeight: "400",
    backgroundColor: "#f9f9f9"
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
        Profit & Loss Account Analysis
      </div>

      <div style={{ fontSize: "10px", color: "#666", marginBottom: "12px", textAlign: "right" }}>
        Amount in Lacs(Rs.)
      </div>
      
      <table style={{ 
        width: "100%", 
        borderCollapse: "collapse",
        border: "1px solid #ddd"
      }}>
        <thead>
          <tr>
            <th style={elementHeaderStyle} rowSpan="2">Elements</th>
            <th style={headerStyle} colSpan="2">Actuals (values in Lacs)</th>
            <th style={headerStyle} colSpan="2">Common Size (%)</th>
          </tr>
          <tr>
            <th style={subHeaderStyle}>Standalone</th>
            <th style={subHeaderStyle}>Consolidated</th>
            <th style={subHeaderStyle}>Standalone %</th>
            <th style={subHeaderStyle}>Consolidated %</th>
          </tr>
        </thead>
        <tbody>
          {/* Total Revenue */}
          <tr>
            <td style={rowLabelStyle}>Total Revenue</td>
            <td style={cellStyle}>{formatAmount(data.totalRevenue.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.totalRevenue.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.totalRevenue.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.totalRevenue.consolidatedPercent)}</td>
          </tr>

          {/* Operating Revenue */}
          <tr>
            <td style={rowLabelStyle}>Operating Revenue</td>
            <td style={cellStyle}>{formatAmount(data.operatingRevenue.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.operatingRevenue.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.operatingRevenue.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.operatingRevenue.consolidatedPercent)}</td>
          </tr>

          {/* Other Income */}
          <tr>
            <td style={rowLabelStyle}>Other Income</td>
            <td style={cellStyle}>{formatAmount(data.otherIncome.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.otherIncome.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.otherIncome.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.otherIncome.consolidatedPercent)}</td>
          </tr>

          {/* Total Expenses */}
          <tr>
            <td style={rowLabelStyle}>Total Expenses</td>
            <td style={cellStyle}>{formatAmount(data.totalExpenses.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.totalExpenses.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.totalExpenses.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.totalExpenses.consolidatedPercent)}</td>
          </tr>

          {/* EBDITA */}
          <tr>
            <td style={rowLabelStyle}>EBDITA</td>
            <td style={cellStyle}>{formatAmount(data.ebdita.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.ebdita.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.ebdita.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.ebdita.consolidatedPercent)}</td>
          </tr>

          {/* Depreciation */}
          <tr>
            <td style={rowLabelStyle}>Depreciation</td>
            <td style={cellStyle}>{formatAmount(data.depreciation.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.depreciation.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.depreciation.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.depreciation.consolidatedPercent)}</td>
          </tr>

          {/* Interest */}
          <tr>
            <td style={rowLabelStyle}>Interest</td>
            <td style={cellStyle}>{formatAmount(data.interest.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.interest.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.interest.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.interest.consolidatedPercent)}</td>
          </tr>

          {/* PBT */}
          <tr>
            <td style={rowLabelStyle}>PBT</td>
            <td style={cellStyle}>{formatAmount(data.pbt.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.pbt.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.pbt.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.pbt.consolidatedPercent)}</td>
          </tr>

          {/* Tax */}
          <tr>
            <td style={rowLabelStyle}>Tax</td>
            <td style={cellStyle}>{formatAmount(data.tax.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.tax.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.tax.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.tax.consolidatedPercent)}</td>
          </tr>

          {/* Other Adjustments */}
          <tr>
            <td style={rowLabelStyle}>Other Adjustments</td>
            <td style={cellStyle}>{formatAmount(data.otherAdjustments.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.otherAdjustments.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.otherAdjustments.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.otherAdjustments.consolidatedPercent)}</td>
          </tr>

          {/* PAT */}
          <tr>
            <td style={rowLabelStyle}>PAT</td>
            <td style={cellStyle}>{formatAmount(data.pat.standalone)}</td>
            <td style={cellStyle}>{formatAmount(data.pat.consolidated)}</td>
            <td style={cellStyle}>{formatPercent(data.pat.standalonePercent)}</td>
            <td style={cellStyle}>{formatPercent(data.pat.consolidatedPercent)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CommonSizePLTable;