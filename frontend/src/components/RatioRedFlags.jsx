// src/components/RatioRedFlags.jsx

function RatioRedFlags({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      {data.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            marginBottom: "12px",
            fontSize: "14px"
          }}
        >
          <span style={{ marginRight: "8px" }}>🚩</span>
          <p style={{ margin: 0 }}>
            <strong>{item.ratio}</strong> | {item.year} |{" "}
            <strong>Actual Value</strong> = {item.actual} |{" "}
            <strong>Risk Benchmark</strong> = {item.benchmark} :{" "}
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default RatioRedFlags;
