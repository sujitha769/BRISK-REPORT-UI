import React from "react";

/**
 * Component to display Other Expense data in a table
 * @param {Object} props - Component props
 * @param {Object} props.data - Other expense data object
 */
function OtherExpenseTable({ data }) {
  if (!data) {
    return <p>No Other Expense data available</p>;
  }

  const {
    consumptionOfStoresAndSpareParts = [],
    powerAndFuels = [],
    rents = [],
    repairsToBuildingAndMachineries = [],
    travellingConveyances = [],
    ratesAndTaxes = [],
    legalProfessionalCharges = [],
    advertisingPromotionals = [],
    paymentsToAuditors = [],
    miscellaneousExpenses = [],
    totalOtherExpenses = []
  } = data;

  // Get all unique years from the data
  const years = totalOtherExpenses.map(item => item.FinancialYear).sort();

  // Helper function to get amount for a specific year
  const getAmount = (dataArray, year) => {
    const item = dataArray.find(d => d.FinancialYear === year);
    if (!item || item.Amount === 0) return "-";
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
        Other Expense
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
            <td style={labelStyle}>Consumption of stores and spare parts</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(consumptionOfStoresAndSpareParts, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Power and fuel</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(powerAndFuels, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Rent</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(rents, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Repairs to building & Machinery</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(repairsToBuildingAndMachineries, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Travelling conveyance</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(travellingConveyances, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Rates and taxes</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(ratesAndTaxes, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Legal professional charges</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(legalProfessionalCharges, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Advertising Promotional</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(advertisingPromotionals, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Payments to auditor</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(paymentsToAuditors, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={labelStyle}>Miscellaneous expenses</td>
            {years.map(year => (
              <td key={year} style={tdStyle}>
                {getAmount(miscellaneousExpenses, year)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={{ ...labelStyle, fontWeight: "600", backgroundColor: "#0b4ea2", color: "white" }}>
              Total Other Expense
            </td>
            {years.map(year => (
              <td key={year} style={{ ...totalRowStyle, fontWeight: "700" }}>
                {getAmount(totalOtherExpenses, year)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OtherExpenseTable;