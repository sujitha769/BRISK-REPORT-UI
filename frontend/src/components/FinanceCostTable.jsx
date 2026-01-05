import React from "react";

/**
 * Component to display Finance Cost data in a table
 * @param {Object} props - Component props
 * @param {Object} props.data - Finance cost data object
 */
function FinanceCostTable({ data }) {
  if (!data) {
    return <p>No Finance Cost data available</p>;
  }

  const {
    interestOnBorrowings = [],
    otherFinanceCharges = [],
    totalFinanceCosts = []
  } = data;

  // Get all unique years from the data
  const years = totalFinanceCosts.map(item => item.FinancialYear).sort();

  // Helper function to get amount for a specific year
  const getAmount = (dataArray, year) => {
    const item = dataArray.find(d => d.FinancialYear === year);
    return item ? (item.Amount / 100000000).toFixed(2) : "-";
  };

  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "600"
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "right",
    verticalAlign: "top"
  };

  const labelStyle = {
    ...tdStyle,
    textAlign: "left",
    fontWeight: "500",
    backgroundColor: "#f8f9fa"
  };

  const totalRowStyle = {
    ...tdStyle,
    fontWeight: "600",
    backgroundColor: "#f5f5f5"
  };

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
        Finance Cost
      </div>

      <div style={{ fontSize: "12px", color: "#666", marginBottom: "16px", textAlign: "right" }}>
        Values in Lacs(Rs.)
      </div>
      
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th style={thStyle}>Element Name</th>
            {years.map(year => (
              <th key={year} style={thStyle}>
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelStyle}>Interest on Borrowings</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(interestOnBorrowings, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Other Finance related Charges</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(otherFinanceCharges, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={{ ...labelStyle, fontWeight: "600", backgroundColor: "#0b4ea2", color: "white" }}>
              Total Finance costs
            </td>
            {years.map(year => (
              <td key={year} style={{ ...totalRowStyle, fontWeight: "700" }}>
                {getAmount(totalFinanceCosts, year)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FinanceCostTable;