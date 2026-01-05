import React from "react";
import {
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

/**
 * Component to display Standalone Vs Consolidated Comparison Charts
 * @param {Object} props - Component props
 * @param {Object} props.data - Standalone vs consolidated data object
 */
function StandaloneVsConsolidatedCharts({ data }) {
  if (!data) {
    return <p>No Standalone Vs Consolidated data available</p>;
  }

  const { revenueVsExpenses, patComparison } = data;

  // Prepare Chart 1 Data: Total Revenue Vs Total Expenses
  const chart1Data = revenueVsExpenses.map(item => ({
    year: item.FinancialYear,
    StandaloneRevenue: (item.StandaloneRevenue / 100000000).toFixed(0),
    ConsolidatedRevenue: (item.ConsolidatedRevenue / 100000000).toFixed(0),
    StandaloneExpense: (item.StandaloneExpense / 100000000).toFixed(0),
    ConsolidatedExpense: (item.ConsolidatedExpense / 100000000).toFixed(0)
  }));

  // Prepare Chart 2 Data: PAT Standalone Vs PAT Consolidated
  const chart2Data = patComparison.map(item => ({
    year: item.FinancialYear,
    StandalonePAT: (item.StandalonePAT / 100000000).toFixed(0),
    ConsolidatedPAT: (item.ConsolidatedPAT / 100000000).toFixed(0)
  }));

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    marginTop: "30px"
  };

  const chartCardStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    pageBreakInside: "avoid",
    breakInside: "avoid",
    width: "600px",
    maxWidth: "90%"
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center"
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#888",
    marginBottom: "20px",
    textAlign: "center"
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px"
        }}>
          <p style={{ margin: "0 0 5px 0", fontWeight: "600" }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: "2px 0", color: entry.color, fontSize: "12px" }}>
              {entry.name}: {parseFloat(entry.value).toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Format Y-axis values
  const formatYAxis = (value) => {
    return (value / 1000).toLocaleString();
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <div style={containerStyle}>
        {/* Chart 1: Total Revenue Vs Total Expenses */}
        <div style={chartCardStyle}>
          <div style={titleStyle}>Total Revenue Vs Total Expenses</div>
          
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chart1Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#ccc" }}
                label={{ 
                  value: "Financial Years", 
                  position: "insideBottom", 
                  offset: -5, 
                  fontSize: 12,
                  fontStyle: "italic"
                }}
              />
              <YAxis 
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#ccc" }}
                tickFormatter={formatYAxis}
                label={{ 
                  value: "Amount (Rs. in Lacs)", 
                  angle: -90, 
                  position: "insideLeft", 
                  fontSize: 12 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: "12px", paddingTop: "15px" }}
                iconType="rect"
                iconSize={12}
              />
              <Bar 
                dataKey="StandaloneRevenue" 
                fill="#003d52" 
                name="Total Revenue (Standalone)"
                barSize={30}
              />
              <Bar 
                dataKey="ConsolidatedRevenue" 
                fill="#006d8f" 
                name="Total Revenue (Consolidated)"
                barSize={30}
              />
              <Line 
                type="monotone" 
                dataKey="StandaloneExpense" 
                stroke="#ff9800" 
                strokeWidth={3}
                name="Total Expenses (Standalone)"
                dot={{ r: 5, fill: "#ff9800" }}
              />
              <Line 
                type="monotone" 
                dataKey="ConsolidatedExpense" 
                stroke="#f57c00" 
                strokeWidth={3}
                name="Total Expenses (Consolidated)"
                dot={{ r: 5, fill: "#f57c00" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: PAT Standalone Vs PAT Consolidated */}
        <div style={chartCardStyle}>
          <div style={subtitleStyle}>Comparison between</div>
          <div style={titleStyle}>PAT Standalone Vs PAT Consolidation</div>
          
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chart2Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#ccc" }}
                label={{ 
                  value: "Financial Years", 
                  position: "insideBottom", 
                  offset: -5, 
                  fontSize: 12 
                }}
              />
              <YAxis 
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#ccc" }}
                tickFormatter={formatYAxis}
                label={{ 
                  value: "Amount (Rs. in Lacs)", 
                  angle: -90, 
                  position: "insideLeft", 
                  fontSize: 12 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: "12px", paddingTop: "15px" }}
                iconType="rect"
                iconSize={12}
              />
              <Bar 
                dataKey="StandalonePAT" 
                fill="#003d52" 
                name="PAT (Standalone)"
                barSize={40}
              />
              <Bar 
                dataKey="ConsolidatedPAT" 
                fill="#00b894" 
                name="PAT (Consolidated)"
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StandaloneVsConsolidatedCharts;