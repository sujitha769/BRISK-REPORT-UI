import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

function formatLacs(value) {
  return (value / 100000).toLocaleString("en-IN");
}

function CashFlowComparisonChartConsolidated({
  data,
  title = "Cash Flow Statement : Comparison Graph (Consolidated)"
}) {
  if (!data || data.length === 0) return null;

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
          {title}
        </h2>

        <p style={{ 
          color: "#666", 
          margin: "0 0 20px 0",
          fontSize: "14px",
          textAlign: "center"
        }}>
          Operating, Investing & Financing Activities
        </p>

        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
            barCategoryGap="25%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
              vertical={false}
            />

            {/* Zero reference line */}
            <ReferenceLine y={0} stroke="#666" strokeWidth={1} />

            <XAxis
              dataKey="year"
              tick={{ fill: "#666", fontSize: 13 }}
              label={{
                value: "Financial Years",
                position: "insideBottom",
                offset: -10,
                fill: "#666"
              }}
            />

            <YAxis
              tickFormatter={formatLacs}
              tick={{ fill: "#666", fontSize: 13 }}
              domain={["auto", "auto"]}
              label={{
                value: "Amount (Rs. in Lacs)",
                angle: -90,
                position: "insideLeft",
                dx: -25,
                fill: "#666"
              }}
            />

            <Tooltip
              formatter={(v) => formatLacs(Math.abs(v))}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            />

            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="rect"
              iconSize={12}
            />

            <Bar
              dataKey="operatingActivities"
              name="Operating Activities"
              fill="#0c5273"
            />
            <Bar
              dataKey="investingActivities"
              name="Investing Activities"
              fill="#147a9e"
            />
            <Bar
              dataKey="financingActivities"
              name="Financing Activities"
              fill="#5eb3d6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CashFlowComparisonChartConsolidated;