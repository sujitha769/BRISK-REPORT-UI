import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from "recharts";

/**
 * RatioComparisonChart Component
 * Displays 4 ratio analysis comparison charts in a 2x2 grid layout
 */
function RatioComparisonChart({ data }) {
  if (!data) {
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
            border: "1px solid #dbeafe",
          }}
        >
          Ratio Analysis: Comparison Graphs
        </div>
        <p style={{ marginTop: "10px" }}>No ratio analysis data available</p>
      </div>
    );
  }

  // Helper function to format chart data for recharts
  const formatChartData = (datasets) => {
    if (!datasets || Object.keys(datasets).length === 0) return [];
    
    // Get all unique years from all datasets
    const allYears = new Set();
    Object.values(datasets).forEach(dataset => {
      if (Array.isArray(dataset)) {
        dataset.forEach(item => allYears.add(item.year));
      }
    });
    
    // Create combined data structure
    const years = Array.from(allYears).sort();
    return years.map(year => {
      const dataPoint = { year };
      Object.entries(datasets).forEach(([key, dataset]) => {
        if (Array.isArray(dataset)) {
          const item = dataset.find(d => d.year === year);
          dataPoint[key] = item ? item.value : null;
        }
      });
      return dataPoint;
    });
  };

  // Container styles
  const containerStyle = {
    position: "relative",
    padding: "20px 0",
    marginTop: "30px",
    width: "100%",
    boxSizing: "border-box"
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginTop: "20px",
    width: "100%",
    boxSizing: "border-box"
  };

  const chartCardStyle = {
    width: "100%",
    boxSizing: "border-box",
    minWidth: 0
  };

  const titleStyle = {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "3px",
    color: "#333"
  };

  const subtitleStyle = {
    fontSize: "12px",
    color: "#666",
    marginBottom: "15px"
  };

  // Chart 1: Return on Capital Employed & Return on Equity
  const returnsData = formatChartData({
    roce: data.returns?.roce || [],
    roe: data.returns?.roe || []
  });

  // Chart 2: Quick Ratio & Current Ratio
  const liquidityData = formatChartData({
    quickRatio: data.liquidity?.quickRatio || [],
    currentRatio: data.liquidity?.currentRatio || []
  });

  // Chart 3: Leverage (TOL/TNW) & Net debt-equity
  const leverageData = formatChartData({
    leverageTOL: data.leverage?.leverageTOL || [],
    netDebtEquity: data.leverage?.netDebtEquity || []
  });

  // Chart 4: Operating Cash Margin & Free Cash Flow/OCF
  const cashFlowData = formatChartData({
    ocfMargin: data.cashFlow?.ocfMargin || [],
    freeCashFlowOCF: data.cashFlow?.freeCashFlowOCF || []
  });

  return (
    <div style={containerStyle}>
      <div
        style={{
          background: "#d9d9dc92",
          color: "#0d6efd",
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "600",
          marginBottom: "20px"
        }}
      >
        Ratio Analysis: Comparison Graphs
      </div>
      
      <div style={gridContainerStyle} className="ratio-charts-grid">
        {/* Chart 1: Returns */}
        {returnsData.length > 0 && (
          <div style={chartCardStyle} className="chart-card">
            <div style={titleStyle}>Ratio Analysis : Comparison Graph</div>
            <div style={subtitleStyle}>Return on Capital Employed, & Return on Equity</div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={returnsData}
                margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: "#666", fontSize: 11 }}
                  angle={0}
                  textAnchor="middle"
                >
                  <Label 
                    value="Financial Years" 
                    position="bottom" 
                    offset={0}
                    style={{ fill: "#666", fontSize: 12 }}
                  />
                </XAxis>
                <YAxis 
                  tick={{ fill: "#666", fontSize: 11 }}
                >
                  <Label 
                    value="Value (in Percentage)"
                    angle={-90} 
                    position="insideLeft"
                    style={{ fill: "#666", fontSize: 12, textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "12px"
                  }}
                  formatter={(value) => {
                    if (value === null) return "N/A";
                    return typeof value === "number" ? value.toFixed(2) : value;
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "15px", fontSize: "12px" }}
                  iconType="square"
                  iconSize={12}
                />
                <Bar 
                  dataKey="roce" 
                  name="Return on capital employed (RoCE) (%)"
                  fill="#006b7d"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                />
                <Bar 
                  dataKey="roe" 
                  name="Return on equity (RoE) (%)"
                  fill="#4da6b3"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Chart 2: Liquidity */}
        {liquidityData.length > 0 && (
          <div style={chartCardStyle} className="chart-card">
            <div style={titleStyle}>Ratio Analysis : Comparison Graph</div>
            <div style={subtitleStyle}>Quick Ratio & Current Ratio</div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={liquidityData}
                margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: "#666", fontSize: 11 }}
                  angle={0}
                  textAnchor="middle"
                >
                  <Label 
                    value="Financial Years" 
                    position="bottom" 
                    offset={0}
                    style={{ fill: "#666", fontSize: 12 }}
                  />
                </XAxis>
                <YAxis 
                  tick={{ fill: "#666", fontSize: 11 }}
                >
                  <Label 
                    value="Value (in Percentage)"
                    angle={-90} 
                    position="insideLeft"
                    style={{ fill: "#666", fontSize: 12, textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "12px"
                  }}
                  formatter={(value) => {
                    if (value === null) return "N/A";
                    return typeof value === "number" ? value.toFixed(2) : value;
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "15px", fontSize: "12px" }}
                  iconType="square"
                  iconSize={12}
                />
                <Bar 
                  dataKey="quickRatio" 
                  name="Quick Ratio"
                  fill="#006b7d"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                />
                <Bar 
                  dataKey="currentRatio" 
                  name="Current ratio"
                  fill="#00a878"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Chart 3: Leverage */}
        {leverageData.length > 0 && (
          <div style={chartCardStyle} className="chart-card">
            <div style={titleStyle}>Ratio Analysis : Comparison Graph</div>
            <div style={subtitleStyle}>Leverage (TOL/TNW) & Net debt-equity</div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={leverageData}
                margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: "#666", fontSize: 11 }}
                  angle={0}
                  textAnchor="middle"
                >
                  <Label 
                    value="Financial Years" 
                    position="bottom" 
                    offset={0}
                    style={{ fill: "#666", fontSize: 12 }}
                  />
                </XAxis>
                <YAxis 
                  tick={{ fill: "#666", fontSize: 11 }}
                >
                  <Label 
                    value="Value (in Percentage)"
                    angle={-90} 
                    position="insideLeft"
                    style={{ fill: "#666", fontSize: 12, textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "12px"
                  }}
                  formatter={(value) => {
                    if (value === null) return "N/A";
                    return typeof value === "number" ? value.toFixed(2) : value;
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "15px", fontSize: "12px" }}
                  iconType="square"
                  iconSize={12}
                />
                <Bar 
                  dataKey="leverageTOL" 
                  name="Leverage (TOL/TNW)"
                  fill="#006b7d"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                />
                <Bar 
                  dataKey="netDebtEquity" 
                  name="Net debt-equity"
                  fill="#00a878"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Chart 4: Cash Flow (Line Chart) */}
        {cashFlowData.length > 0 && (
          <div style={chartCardStyle} className="chart-card">
            <div style={titleStyle}>Ratio Analysis : Comparison Graph</div>
            <div style={subtitleStyle}>Operating Cash Margin (OCF/Sales) (%) & Free Cash Flow/OCF (%)</div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart
                data={cashFlowData}
                margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: "#666", fontSize: 11 }}
                  angle={0}
                  textAnchor="middle"
                >
                  <Label 
                    value="Financial Years" 
                    position="bottom" 
                    offset={0}
                    style={{ fill: "#666", fontSize: 12 }}
                  />
                </XAxis>
                <YAxis 
                  tick={{ fill: "#666", fontSize: 11 }}
                >
                  <Label 
                    value="Value (in Percentage)"
                    angle={-90} 
                    position="insideLeft"
                    style={{ fill: "#666", fontSize: 12, textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "12px"
                  }}
                  formatter={(value) => {
                    if (value === null) return "N/A";
                    return typeof value === "number" ? value.toFixed(2) : value;
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "15px", fontSize: "12px" }}
                  iconType="square"
                  iconSize={12}
                />
                <Line 
                  type="monotone"
                  dataKey="ocfMargin" 
                  name="Operating Cash Margin (OCF/Sales) (%)"
                  stroke="#006b7d"
                  strokeWidth={2}
                  dot={{ fill: "#006b7d", r: 4 }}
                />
                <Line 
                  type="monotone"
                  dataKey="freeCashFlowOCF" 
                  name="Free Cash Flow/OCF (%)"
                  stroke="#00a878"
                  strokeWidth={2}
                  dot={{ fill: "#00a878", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <style>{`
        @media print {
          .ratio-charts-grid {
            display: block !important;
            grid-template-columns: none !important;
          }
          
          .chart-card {
            width: 100% !important;
            page-break-inside: avoid;
            margin-bottom: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default RatioComparisonChart;