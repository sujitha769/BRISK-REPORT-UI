
function NICProductsTable({ data }) {
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
        Products Details - NIC Based
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th style={thStyle}>Data Year</th>
            <th style={thStyle}>Main Activity Group Description</th>
            <th style={thStyle}>Business Activity Description</th>
            <th style={thStyle}>Turnover Percentage</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td style={tdStyle}>{row.financialYear}</td>
              <td style={tdStyle}>{row.mainActivityGroup}</td>
              <td style={tdStyle}>{row.businessActivity}</td>
              <td style={{ ...tdStyle, textAlign: "right" }}>
                {row.turnoverPercentage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Styles ---------- */
const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "600"
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  verticalAlign: "top"
};


export default NICProductsTable;