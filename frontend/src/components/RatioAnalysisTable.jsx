import React from "react";

/**
 * Ratio Analysis Table Component
 * Displays financial ratios in a categorized table format
 */
function RatioAnalysisTable({ data }) {
  if (!data) {
    return (
      <div
        style={{
          position: "relative",
          border: "1px solid #e5e7eb",
          padding: "20px",
          marginTop: "24px",
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
            border: "1px solid #dbeafe"
          }}
        >
          Ratio Analysis (Standalone)
        </div>
        <p style={{ marginTop: "10px" }}>
          No ratio analysis data available
        </p>
      </div>
    );
  }

  const { years, sections } = data;

  /* ---------- Format Numbers ---------- */
  const formatValue = (value) => {
    if (value === null || value === undefined) return "-";

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    const formatted = absValue.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return isNegative ? `(${formatted})` : formatted;
  };

  /* ---------- YOY ---------- */
  const calculateYOY = (values) => {
    if (!values || values.length < 2) return null;
    const last = values[values.length - 1];
    const prev = values[values.length - 2];
    if (last === null || prev === null || prev === 0) return null;
    return ((last - prev) / Math.abs(prev)) * 100;
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #e5e7eb",
        padding: "20px",
        marginTop: "24px",
        borderRadius: "12px",
        background: "#ffffff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
      }}
    >
      {/* ---------- Title ---------- */}
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
          border: "1px solid #dbeafe"
        }}
      >
        Ratio Analysis (Standalone)
      </div>

      {/* ---------- Table ---------- */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "12px",
          fontSize: "13px",
          tableLayout: "fixed" // 🔑 IMPORTANT
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0b4ea2", color: "white" }}>
            <th
              style={{
                padding: "8px 10px",
                textAlign: "left",
                border: "1px solid #0b4ea2",
                fontWeight: "600",
                width: "24%"
              }}
            >
              Element Name
            </th>

            {years.map((year, idx) => (
              <th
                key={idx}
                style={{
                  padding: "8px 6px",
                  textAlign: "center",
                  border: "1px solid #0b4ea2",
                  fontWeight: "600",
                  width: `${(66 / years.length).toFixed(2)}%`
                }}
              >
                {year}
              </th>
            ))}

            <th
              style={{
                padding: "8px 6px",
                textAlign: "center",
                border: "1px solid #0b4ea2",
                fontWeight: "600",
                width: "10%"
              }}
            >
              Y-O-Y
            </th>
          </tr>
        </thead>

        <tbody>
          {sections.map((section, sIdx) => (
            <React.Fragment key={sIdx}>
              {/* ---------- Section Header ---------- */}
              <tr style={{ backgroundColor: "#d9f1f6" }}>
                <td
                  colSpan={years.length + 2}
                  style={{
                    padding: "8px 10px",
                    fontWeight: "600",
                    border: "1px solid #ddd"
                  }}
                >
                  {section.title}
                </td>
              </tr>

              {/* ---------- Rows ---------- */}
              {section.rows.map((row, rIdx) => {
                const yoy = calculateYOY(row.values);

                return (
                  <tr
                    key={rIdx}
                    style={{
                      backgroundColor:
                        rIdx % 2 === 0 ? "#ffffff" : "#f9f9f9"
                    }}
                  >
                    <td
                      style={{
                        padding: "8px 10px",
                        border: "1px solid #ddd",
                        fontWeight: "500"
                      }}
                    >
                      {row.name}
                    </td>

                    {row.values.map((val, vIdx) => (
                      <td
                        key={vIdx}
                        style={{
                          padding: "8px 6px",
                          textAlign: "right",
                          border: "1px solid #ddd",
                          color:
                            val !== null && val < 0 ? "#dc3545" : "#333"
                        }}
                      >
                        {formatValue(val)}
                      </td>
                    ))}

                    <td
                      style={{
                        padding: "8px 6px",
                        textAlign: "right",
                        border: "1px solid #ddd",
                        color: yoy !== null && yoy < 0 ? "#dc3545" : "#333"
                      }}
                    >
                      {yoy !== null ? formatValue(yoy) : "-"}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RatioAnalysisTable;
