import React from "react";

const LegalCasesSummaryTable = ({ summary }) => {
  if (!summary) {
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
          Legal Cases Summary
        </div>
        <p style={{ color: "#666", marginTop: "10px", fontSize: "13px" }}>No legal cases summary available.</p>
      </div>
    );
  }

  const courts = [
    { key: "supremeCourt", label: "Supreme Court" },
    { key: "highCourt", label: "High Court" },
    { key: "districtCourt", label: "District Court" },
    { key: "tribunal", label: "Tribunals" },
    { key: "other", label: "Others" },
  ];

  const caseTypes = [
    { key: "criminal", label: "Criminal" },
    { key: "civil", label: "Civil" },
    { key: "unclassified", label: "Unclassified" },
  ];

  const getValue = (court, type, status) =>
    summary.types[type][status].breakdown[court] || 0;

  const getTotal = (court, type) =>
    getValue(court, type, "open") +
    getValue(court, type, "disposed") +
    getValue(court, type, "unknown");

  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "13px"
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    fontSize: "13px"
  };

  const courtNameStyle = {
    ...tdStyle,
    fontWeight: "600"
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
        Legal Cases Summary
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th style={thStyle}>Courts</th>
            <th style={thStyle}>Case Type</th>
            <th style={thStyle}>Open Cases</th>
            <th style={thStyle}>Disposed Cases</th>
            <th style={thStyle}>Unknown Cases</th>
          </tr>
        </thead>

        <tbody>
          {courts.map((court) =>
            caseTypes.map((type, index) => (
              <tr key={`${court.key}-${type.key}`}>
                {index === 0 && (
                  <td rowSpan={3} style={courtNameStyle}>
                    {court.label}
                  </td>
                )}
                <td style={tdStyle}>
                  {type.label} ({getTotal(court.key, type.key)})
                </td>
                <td style={tdStyle}>
                  {getValue(court.key, type.key, "open")}
                </td>
                <td style={tdStyle}>
                  {getValue(court.key, type.key, "disposed")}
                </td>
                <td style={tdStyle}>
                  {getValue(court.key, type.key, "unknown")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LegalCasesSummaryTable;