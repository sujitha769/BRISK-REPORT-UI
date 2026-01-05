import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const formatYAxis = (value) => {
  return value.toLocaleString("en-IN");
};


function PLComparisonChart({ data }) {
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
        Profit & Loss Financials : Comparison Graph
      </div>

      <p style={{ marginTop: "10px", marginBottom: "20px", color: "#666", fontSize: "14px" }}>
        Operating Revenue, EBDITA & PAT
      </p>

      {/* ✅ CENTER WRAPPER */}
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <BarChart 
          width={800} 
          height={350} 
          data={data}
          margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            label={{ value: "Financial Years", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12 }}
            width={80}
            label={{
              value: "Amount (Rs. in Lacs)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" }
            }}
          />
          <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
          <Legend 
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="rect"
          />

          <Bar dataKey="operatingRevenue" fill="#1a1d5c" name="Operating Revenue" />
          <Bar dataKey="ebdita" fill="#3b5998" name="EBDITA" />
          <Bar dataKey="pat" fill="#4caf50" name="PAT" />
        </BarChart>
      </div>
    </div>
  );
}

export default PLComparisonChart;