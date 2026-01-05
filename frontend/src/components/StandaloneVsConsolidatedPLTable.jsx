import React from "react";

const th = {
  background: "#0b4a7d",
  color: "#fff",
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center"
};

const td = {
  padding: "8px",
  border: "1px solid #ddd",
  textAlign: "right"
};

const sectionRow = {
  background: "#d7f1f6",
  fontWeight: 600,
  textAlign: "left"
};

const labelCell = {
  textAlign: "left",
  fontWeight: 500
};

const formatLacs = (v) =>
  v == null ? "-" : (v / 100000).toLocaleString("en-IN");

function StandaloneVsConsolidatedPLTable({ data }) {
  if (!data || !data.sections?.length) return null;

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Heading */}
      <h2>{data.title}</h2>
      <p style={{ color: "#666" }}>{data.subtitle}</p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Element Name</th>
            {data.years.map((y) => (
              <th key={y} style={th}>
                {y}
              </th>
            ))}
            <th style={th}>Y-O-Y</th>
          </tr>
        </thead>

        <tbody>
          {data.sections.map((section, sIdx) => (
            <React.Fragment key={sIdx}>
              {/* Section Header */}
              <tr>
                <td
                  colSpan={data.years.length + 2}
                  style={sectionRow}
                >
                  {section.sectionName}
                </td>
              </tr>

              {/* Rows */}
              {section.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  <td style={labelCell}>{row.name}</td>
                  {row.values.map((v, i) => (
                    <td key={i} style={td}>
                      {formatLacs(v)}
                    </td>
                  ))}
                  <td style={td}>-</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StandaloneVsConsolidatedPLTable;
