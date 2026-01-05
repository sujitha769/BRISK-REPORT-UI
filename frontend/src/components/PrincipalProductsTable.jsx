function PrincipalProductsTable({ data }) {
  if (!data || data.length === 0) return null;

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
        Principal Products and Services
      </div>

      <div style={headerContainerStyle}>
        <span style={amountLabelStyle}>Amount in Lacs(Rs.)</span>
      </div>
      
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={thStyle}>Financial<br/>Year</th>
            <th style={thStyle}>ITC 8<br/>digit</th>
            <th style={thStyle}>ITC 4<br/>digit</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Turnover(8digit)</th>
            <th style={thStyle}>Turnover(4digit)</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr 
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa" }}
            >
              <td style={tdStyle}>{row.financialYear}</td>
              <td style={tdStyle}>{row.itc8Digit}</td>
              <td style={tdStyle}>{row.itc4Digit}</td>
              <td style={tdStyle}>{row.category}</td>
              <td style={tdStyle}>{row.description}</td>
              <td style={tdStyleRight}>
                {formatAmount(row.turnover8Digit)}
              </td>
              <td style={tdStyleRight}>
                {formatAmount(row.turnover4Digit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Helpers ---------- */
function formatAmount(value) {
  if (value === "NA") return "NA";
  return (value / 100000).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* ---------- Styles ---------- */
const headerContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: "8px",
};

const amountLabelStyle = {
  fontSize: "13px",
  color: "#666",
  fontWeight: "500"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px"
};

const headerRowStyle = {
  backgroundColor: "#0b4ea2",
  color: "white"
};

const thStyle = {
  padding: "8px 10px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "13px",
  lineHeight: "1.3"
};

const tdStyle = {
  padding: "8px 10px",
  border: "1px solid #ddd",
  verticalAlign: "top",
  fontSize: "13px",
  lineHeight: "1.4"
};

const tdStyleRight = {
  ...tdStyle,
  textAlign: "right"
};

export default PrincipalProductsTable;