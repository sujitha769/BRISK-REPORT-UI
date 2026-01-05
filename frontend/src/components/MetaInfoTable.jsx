function MetaInfoTable({ meta }) {
  if (!meta) return null;

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
        border: "1px solid #ddd"
      }}
    >
      <tbody>
        <tr>
          <th style={thStyle}>Order ID</th>
          <td style={tdStyle}>{meta.OrderID}</td>

          <th style={thStyle}>Version</th>
          <td style={tdStyle}>{meta.Version}</td>
        </tr>

        <tr>
          <th style={thStyle}>Company CIN</th>
          <td style={tdStyle}>{meta.Input}</td>

          <th style={thStyle}>Generated On</th>
          <td style={tdStyle}>{meta.OrderTimeStamp}</td>
        </tr>
      </tbody>
    </table>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "8px",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ddd",
  width: "15%"
};

const tdStyle = {
  padding: "8px",
  border: "1px solid #ddd",
  width: "35%"
};

export default MetaInfoTable;
