import React from "react";

/**
 * Component to display Borrowings data in a table
 * @param {Object} props - Component props
 * @param {Object} props.data - Borrowings data object
 */
function BorrowingsTable({ data }) {
  if (!data) {
    return <p>No Borrowings data available</p>;
  }

  const { secured, unsecured, totalBorrowings } = data;

  // Get all unique years from the data
  const years = totalBorrowings.map(item => item.FinancialYear).sort();

  // Helper function to get amount for a specific year
  const getAmount = (dataArray, year) => {
    if (!dataArray || dataArray.length === 0) return "-";
    const item = dataArray.find(d => d.FinancialYear === year);
    if (!item || item.Amount === 0) return "0.00";
    return (item.Amount / 100000000).toFixed(2);
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
    fontWeight: "400",
    backgroundColor: "#ffffff"
  };

  const sectionHeaderStyle = {
    ...labelStyle,
    backgroundColor: "white",
    fontWeight: "600",
    color: "#000000"
  };

  const subSectionHeaderStyle = {
    ...labelStyle,
    backgroundColor: "white",
    fontWeight: "500",
    color: "#000000"
  };

  const totalRowStyle = {
    ...tdStyle,
    fontWeight: "600",
    backgroundColor: "#f5f5f5"
  };

  const grandTotalRowStyle = {
    ...tdStyle,
    fontWeight: "700",
    backgroundColor: "#0b4ea2",
    color: "white"
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
        Borrowings
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
          {/* Secured Borrowings Section */}
          <tr>
            <td style={sectionHeaderStyle}>Secured Borrowings</td>
            {years.map(year => <td key={year} style={tdStyle}></td>)}
          </tr>

          {/* Secured - Long-Term */}
          <tr>
            <td style={subSectionHeaderStyle}>Secured - Long-Term</td>
            {years.map(year => <td key={year} style={tdStyle}></td>)}
          </tr>

          <tr>
            <td style={labelStyle}>Secured - Long - Term Loans from Banks</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(secured.longTerm.loansFromBanks, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Secured - Long - Other Borrowings</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(secured.longTerm.loansFromOthers, year)}
              </td>
            ))}
          </tr>

          {/* Secured - Short-Term */}
          <tr>
            <td style={subSectionHeaderStyle}>Secured - Short-Term</td>
            {years.map(year => <td key={year} style={tdStyle}></td>)}
          </tr>

          <tr>
            <td style={labelStyle}>Secured - Short - Loans repayable on demand from Banks</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(secured.shortTerm.loansRepayableOnDemandFromBanks, year)}
              </td>
            ))}
          </tr>

          {/* Total Secured Borrowings */}
          <tr>
            <td style={{ ...labelStyle, fontWeight: "600", backgroundColor: "white" }}>
              Total Secured Borrowings
            </td>
            {years.map(year => (
              <td key={year} style={totalRowStyle}>
                {getAmount(secured.total, year)}
              </td>
            ))}
          </tr>

          {/* Unsecured Borrowings Section */}
          <tr>
            <td style={sectionHeaderStyle}>Unsecured Borrowings</td>
            {years.map(year => <td key={year} style={tdStyle}></td>)}
          </tr>

          {/* Unsecured - Long-Term */}
          <tr>
            <td style={subSectionHeaderStyle}>Unsecured - Long-Term</td>
            {years.map(year => <td key={year} style={tdStyle}></td>)}
          </tr>

          <tr>
            <td style={labelStyle}>Unsecured - Long - Term Loans from Others</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(unsecured.longTerm.loansFromOthers, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Unsecured - Long - Other Borrowings</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(unsecured.longTerm.otherBorrowings, year)}
              </td>
            ))}
          </tr>

          {/* Unsecured - Short-Term */}
          <tr>
            <td style={subSectionHeaderStyle}>Unsecured - Short-Term</td>
            {years.map(year => <td key={year} style={tdStyle}></td>)}
          </tr>

          <tr>
            <td style={labelStyle}>Unsecured - Short - Loans repayable on demand from Banks</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(unsecured.shortTerm.loansRepayableOnDemandFromBanks, year)}
              </td>
            ))}
          </tr>

          {/* Total Unsecured Borrowings */}
          <tr>
            <td style={{ ...labelStyle, fontWeight: "600", backgroundColor: "white" }}>
              Total Unsecured Borrowings
            </td>
            {years.map(year => (
              <td key={year} style={totalRowStyle}>
                {getAmount(unsecured.total, year)}
              </td>
            ))}
          </tr>

          {/* Grand Total Borrowings */}
          <tr>
            <td style={{ ...labelStyle, fontWeight: "700", backgroundColor: "#0b4ea2", color: "white" }}>
              Total Borrowings
            </td>
            {years.map(year => (
              <td key={year} style={grandTotalRowStyle}>
                {getAmount(totalBorrowings, year)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BorrowingsTable;