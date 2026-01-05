import React from "react";

/**
 * Component to display Revenue from Operations data in a table
 * @param {Object} props - Component props
 * @param {Object} props.data - Revenue data object
 */
function RevenueFromOperationsTable({ data }) {
  if (!data) {
    return (
      <div
        style={{
          position: "relative",
          border: "1px solid #e5e7eb",
          padding: "24px",
          marginTop: "40px",
          borderRadius: "12px",
          background: "#ffffff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          color: "#666"
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
          Revenue From Operations
        </div>
        <p style={{ marginTop: "10px" }}>No Revenue from Operations data available</p>
      </div>
    );
  }

  const {
    domesticManufactured = [],
    domesticTraded = [],
    domesticServices = [],
    exportManufactured = [],
    exportTraded = [],
    exportServices = [],
    totalRevenue = []
  } = data;

  // Get all unique years from the data
  const years = totalRevenue.map(item => item.FinancialYear).sort();

  // Helper function to get amount for a specific year
  const getAmount = (dataArray, year) => {
    const item = dataArray.find(d => d.FinancialYear === year);
    return item ? (item.Amount / 100000000).toFixed(2) : "-";
  };

  // Helper function to calculate domestic turnover
  const getDomesticTurnover = (year) => {
    const mfg = domesticManufactured.find(d => d.FinancialYear === year)?.Amount || 0;
    const services = domesticServices.find(d => d.FinancialYear === year)?.Amount || 0;
    return mfg + services > 0 ? ((mfg + services) / 100000000).toFixed(2) : "-";
  };

  // Helper function to calculate export turnover
  const getExportTurnover = (year) => {
    const mfg = exportManufactured.find(d => d.FinancialYear === year)?.Amount || 0;
    const traded = exportTraded.find(d => d.FinancialYear === year)?.Amount || 0;
    const services = exportServices.find(d => d.FinancialYear === year)?.Amount || 0;
    const total = mfg + traded + services;
    return total > 0 ? (total / 100000000).toFixed(2) : "-";
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px"
  };

  const thStyle = {
    backgroundColor: "#0b4ea2",
    color: "white",
    padding: "12px 15px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "15px",
    border: "1px solid #0b4ea2"
  };

  const tdStyle = {
    padding: "12px 15px",
    border: "1px solid #ddd",
    textAlign: "right",
    fontSize: "14px"
  };

  const labelStyle = {
    ...tdStyle,
    textAlign: "left",
    fontWeight: "500",
    backgroundColor: "#ffffff"
  };

  const sectionHeaderStyle = {
    ...labelStyle,
    backgroundColor: "#d9f1f6",
    fontWeight: "600",
    fontSize: "15px"
  };

  const totalRowStyle = {
    ...tdStyle,
    fontWeight: "600",
    backgroundColor: "#f9f9f9"
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #e5e7eb",
        padding: "24px",
        marginTop: "40px",
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
        Revenue From Operations
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <div style={{ fontSize: "14px", color: "#666" }}>
          Values in Lacs(Rs.)
        </div>
      </div>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Element Name</th>
            {years.map(year => (
              <th key={year} style={thStyle}>
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Domestic Turnover Section */}
          <tr>
            <td style={sectionHeaderStyle}>Domestic turnover</td>
            {years.map(year => (
              <td key={year} style={totalRowStyle}>
                {getDomesticTurnover(year)}
              </td>
            ))}
          </tr>

          <tr style={{ backgroundColor: "#ffffff" }}>
            <td style={labelStyle}>Domestic Sales - Manufactured Goods</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(domesticManufactured, year)}
              </td>
            ))}
          </tr>

          <tr style={{ backgroundColor: "#f9f9f9" }}>
            <td style={labelStyle}>Domestic Sales - Services</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(domesticServices, year)}
              </td>
            ))}
          </tr>

          {/* Export Turnover Section */}
          <tr>
            <td style={sectionHeaderStyle}>Export turnover</td>
            {years.map(year => (
              <td key={year} style={totalRowStyle}>
                {getExportTurnover(year)}
              </td>
            ))}
          </tr>

          <tr style={{ backgroundColor: "#ffffff" }}>
            <td style={labelStyle}>Export Sales - Manufactured Goods</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(exportManufactured, year)}
              </td>
            ))}
          </tr>

          {/* Total Revenue */}
          <tr>
            <td style={{ ...labelStyle, fontWeight: "600", backgroundColor: "#0b4ea2", color: "white" }}>
              Total Revenue From Operations
            </td>
            {years.map(year => (
              <td key={year} style={{ ...totalRowStyle, fontWeight: "700" }}>
                {getAmount(totalRevenue, year)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RevenueFromOperationsTable;