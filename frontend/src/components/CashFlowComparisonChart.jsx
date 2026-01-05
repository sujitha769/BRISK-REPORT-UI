import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

/**
 * Cash Flow Comparison Chart Component
 * Displays Operating, Investing & Financing Activities across financial years
 */
function CashFlowComparisonChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px"
      }}>
        <div style={{ width: "75%", maxWidth: "100%" }}>
          <h2 style={{
            color: "#0d6efd",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "8px",
            textAlign: "center"
          }}>
            Cash Flow Statement : Comparison Graph
          </h2>
          <p style={{ 
            color: "#666", 
            margin: "0 0 20px 0",
            fontSize: "14px",
            textAlign: "center"
          }}>
            No data available for Cash Flow comparison
          </p>
        </div>
      </div>
    );
  }

  /* ---------- Custom Tooltip ---------- */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "4px",
            fontSize: "11px"
          }}
        >
          <p style={{ margin: "0 0 4px 0", fontWeight: "600" }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: "2px 0", color: entry.color }}>
              {entry.name}: ₹{entry.value.toLocaleString("en-IN")} Lacs
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  /* ---------- Y Axis Formatter ---------- */
  const formatYAxis = (value) => {
    if (value >= 1000 || value <= -1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toLocaleString("en-IN");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "30px"
    }}>
      <div style={{ width: "75%", maxWidth: "100%" }}>
        <h2 style={{
          color: "#0d6efd",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "8px",
          textAlign: "center"
        }}>
          Cash Flow Statement : Comparison Graph
        </h2>

        <p style={{ 
          color: "#666", 
          margin: "0 0 20px 0",
          fontSize: "14px",
          textAlign: "center"
        }}>
          Operating, Investing & Financing Activities
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 12, right: 20, left: 10, bottom: 12 }}
            barSize={22}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

            <XAxis
              dataKey="year"
              tick={{ fill: "#666", fontSize: 11 }}
              label={{
                value: "Financial Years",
                position: "insideBottom",
                offset: -8,
                style: { fill: "#666", fontSize: 11 }
              }}
            />

            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: "#666", fontSize: 11 }}
              label={{
                value: "Amount (Rs. in Lacs)",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#666", fontSize: 11 }
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{
                paddingBottom: "12px",
                fontSize: "11px"
              }}
            />

            <Bar
              dataKey="operatingActivities"
              name="Operating Activities"
              fill="#055a5b"
              radius={[3, 3, 0, 0]}
            />

            <Bar
              dataKey="investingActivities"
              name="Investing Activities"
              fill="#0891a8"
              radius={[3, 3, 0, 0]}
            />

            <Bar
              dataKey="financingActivities"
              name="Financing Activities"
              fill="#4db8c4"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CashFlowComparisonChart;