function PLStandaloneTable({ data }) {
  if (!data || data.years.length === 0) return null;

  const { years, rows } = data;

  return (
    <div
      style={{
        position: "relative",
        marginTop: "30px",
        padding: "24px",
        borderRadius: "12px",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Floating label */}
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
        Profit & Loss (Standalone)
      </div>

      {/* Units info */}
      <p
        style={{
          textAlign: "right",
          fontSize: "12px",
          color: "#6b7280",
          marginBottom: "10px",
        }}
      >
        Values in Lacs (Rs.)
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #e5e7eb",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#0b4ea2",
              color: "white",
            }}
          >
            <th style={thStyle}>Element Name</th>
            {years.map((year) => (
              <th key={year} style={thStyle}>
                {year}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              style={{
                backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f9fafb",
              }}
            >
              <td style={{ ...tdStyle, fontWeight: "600" }}>
                {row.label}
              </td>

              {years.map((year) => (
                <td
                  key={year}
                  style={{ ...tdStyle, textAlign: "right" }}
                >
                  {formatAmount(row.values[year])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Helpers (UNCHANGED) ---------- */
function formatAmount(value) {
  if (value === undefined || value === null) return "0.00";
  return (value / 100000).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ---------- Styles (slightly refined UI only) ---------- */
const thStyle = {
  padding: "12px",
  border: "1px solid #e5e7eb",
  textAlign: "center",
  fontWeight: "600",
  fontSize: "14px",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #e5e7eb",
  fontSize: "14px",
};

export default PLStandaloneTable;
