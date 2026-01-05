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
  ResponsiveContainer
} from "recharts";

/**
 * Component to display all 4 Ratio Analysis Comparison Charts
 * @param {Object} props - Component props
 * @param {Object} props.data - Ratio charts data object
 */
function RatioComparisonCharts({ data }) {
  if (!data) {
    return <p>No Ratio Analysis Comparison data available</p>;
  }

  const { chart1, chart2, chart3, chart4 } = data;

  // Helper function to prepare chart data
  const prepareChartData = (dataset1, dataset2, key1, key2) => {
    const years = dataset1.map(item => item.FinancialYear);
    return years.map(year => {
      const item1 = dataset1.find(d => d.FinancialYear === year);
      const item2 = dataset2.find(d => d.FinancialYear === year);
      return {
        year: year,
        [key1]: item1 ? parseFloat(item1.Amount.toFixed(2)) : 0,
        [key2]: item2 ? parseFloat(item2.Amount.toFixed(2)) : 0
      };
    });
  };

  // Chart 1 Data: RoCE & RoE
  const chart1Data = prepareChartData(
    chart1.returnOnCapitalEmployed,
    chart1.returnOnEquity,
    "RoCE",
    "RoE"
  );

  // Chart 2 Data: Quick Ratio & Current Ratio
  const chart2Data = prepareChartData(
    chart2.quickRatios,
    chart2.currentRatio,
    "QuickRatio",
    "CurrentRatio"
  );

  // Chart 3 Data: Leverage & Net Debt-Equity
  const chart3Data = prepareChartData(
    chart3.leverageTOLTNW,
    chart3.netDebtEquity,
    "Leverage",
    "NetDebtEquity"
  );

  // Chart 4 Data: Operating Cash Margin & Free Cash Flow
  const chart4Data = prepareChartData(
    chart4.operatingCashMargin,
    chart4.freeCashFlowOCF,
    "OCFMargin",
    "FreeCashFlowOCF"
  );

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
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px"
  };

  const subtitleStyle = {
    fontSize: "13px",
    color: "#888",
    marginBottom: "20px"
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
            <p key={index} style={{ margin: "2px 0", color: entry.color, fontSize: "13px" }}>
              {entry.name}: {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h1>Ratio Analysis : Comparison Graphs</h1>
      
      <div style={containerStyle}>
        {/* Chart 1: RoCE & RoE */}
        <div style={chartCardStyle}>
          <div style={titleStyle}>Ratio Analysis : Comparison Graph</div>
          <div style={subtitleStyle}>Return on Capital Employed, & Return on Equity</div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chart1Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
                label={{ value: "Financial Years", position: "insideBottom", offset: -5, fontSize: 13 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: "Value (in Percentage)", angle: -90, position: "insideLeft", fontSize: 13 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: "13px", paddingTop: "10px" }}
                iconType="square"
              />
              <Bar 
                dataKey="RoCE" 
                fill="#004d66" 
                name="Return on capital employed (RoCE) (%)"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="RoE" 
                fill="#0088aa" 
                name="Return on equity (RoE) (%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Quick Ratio & Current Ratio */}
        <div style={chartCardStyle}>
          <div style={titleStyle}>Ratio Analysis : Comparison Graph</div>
          <div style={subtitleStyle}>Quick Ratio & Current Ratio</div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chart2Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
                label={{ value: "Financial Years", position: "insideBottom", offset: -5, fontSize: 13 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: "Value (in Percentage)", angle: -90, position: "insideLeft", fontSize: 13 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: "13px", paddingTop: "10px" }}
                iconType="square"
              />
              <Bar 
                dataKey="QuickRatio" 
                fill="#004d66" 
                name="Quick Ratio"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="CurrentRatio" 
                fill="#00b894" 
                name="Current ratio"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Leverage & Net Debt-Equity */}
        <div style={chartCardStyle}>
          <div style={titleStyle}>Ratio Analysis : Comparison Graph</div>
          <div style={subtitleStyle}>Leverage (TOL/TNW) & Net debt-equity</div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chart3Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
                label={{ value: "Financial Years", position: "insideBottom", offset: -5, fontSize: 13 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: "Value (in Percentage)", angle: -90, position: "insideLeft", fontSize: 13 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: "13px", paddingTop: "10px" }}
                iconType="square"
              />
              <Bar 
                dataKey="Leverage" 
                fill="#004d66" 
                name="Leverage (TOL/TNW)"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="NetDebtEquity" 
                fill="#00b894" 
                name="Net debt-equity"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4: Operating Cash Margin & Free Cash Flow */}
        <div style={chartCardStyle}>
          <div style={titleStyle}>Ratio Analysis : Comparison Graph</div>
          <div style={subtitleStyle}>Operating Cash Margin (OCF/Sales) (%) & Free Cash Flow/OCF (%)</div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chart4Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
                label={{ value: "Financial Years", position: "insideBottom", offset: -5, fontSize: 13 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: "Value (in Percentage)", angle: -90, position: "insideLeft", fontSize: 13 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: "13px", paddingTop: "10px" }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="OCFMargin" 
                stroke="#004d66" 
                strokeWidth={2}
                name="Operating Cash Margin (OCF/Sales) (%)"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="FreeCashFlowOCF" 
                stroke="#00b894" 
                strokeWidth={2}
                name="Free Cash Flow/OCF (%)"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default RatioComparisonCharts;