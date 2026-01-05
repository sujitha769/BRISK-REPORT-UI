function OwnershipDetailsTable({ data }) {
  if (!data || data.years.length === 0) return null;

  const { years, rows } = data;

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
        Ownership Details
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th style={thStyle}>Shareholder Name</th>
            {years.map((year) => (
              <th key={year} style={thStyle}>
                {year}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td style={{ ...tdStyle, fontWeight: "600" }}>
                {row.shareholderName}
              </td>

              {years.map((year) => (
                <td key={year} style={{ ...tdStyle, textAlign: "right" }}>
                  {row.values[year] !== undefined
                    ? row.values[year].toFixed(2)
                    : "0.00"}
                </td>
              ))}
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
  textAlign: "center",
  fontWeight: "600"
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd"
};

export default OwnershipDetailsTable;