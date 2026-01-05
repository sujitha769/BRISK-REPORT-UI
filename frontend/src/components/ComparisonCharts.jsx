import React from "react";
import {
  ComposedChart,
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
 * Component to display Comparison Charts
 * @param {Object} props - Component props
 * @param {Object} props.data - Comparison charts data object
 */
function ComparisonCharts({ data }) {
  if (!data) {
    return <p>No Comparison Charts data available</p>;
  }

  const { chart1, chart2 } = data;

  // Prepare Chart 1 Data: Return on Networth Vs Long Term Advances to Long Term Borrowing
  const chart1Years = chart1.standaloneROE.map(item => item.FinancialYear);
  const chart1Data = chart1Years.map(year => {
    const stanROE = chart1.standaloneROE.find(d => d.FinancialYear === year);
    const consROE = chart1.consolidatedROE.find(d => d.FinancialYear === year);
    const stanLT = chart1.standaloneLTRatio.find(d => d.FinancialYear === year);
    const consLT = chart1.consolidatedLTRatio.find(d => d.FinancialYear === year);
    
    return {
      year: year,
      StandaloneROE: stanROE ? parseFloat(stanROE.Amount.toFixed(2)) : 0,
      ConsolidatedROE: consROE ? parseFloat(consROE.Amount.toFixed(2)) : 0,
      StandaloneLT: stanLT ? parseFloat(stanLT.Amount.toFixed(2)) : 0,
      ConsolidatedLT: consLT ? parseFloat(consLT.Amount.toFixed(2)) : 0
    };
  });

  // Prepare Chart 2 Data: Current Ratio Vs Debt Equity Ratio
  const chart2Years = chart2.standaloneCurrentRatio.map(item => item.FinancialYear);
  const chart2Data = chart2Years.map(year => {
    const stanCurrent = chart2.standaloneCurrentRatio.find(d => d.FinancialYear === year);
    const consCurrent = chart2.consolidatedCurrentRatio.find(d => d.FinancialYear === year);
    const stanDebt = chart2.standaloneDebtEquity.find(d => d.FinancialYear === year);
    const consDebt = chart2.consolidatedDebtEquity.find(d => d.FinancialYear === year);
    
    return {
      year: year,
      StandaloneCurrentRatio: stanCurrent ? parseFloat(stanCurrent.Amount.toFixed(2)) : 0,
      ConsolidatedCurrentRatio: consCurrent ? parseFloat(consCurrent.Amount.toFixed(2)) : 0,
      StandaloneDebtEquity: stanDebt ? parseFloat(stanDebt.Amount.toFixed(2)) : 0,
      ConsolidatedDebtEquity: consDebt ? parseFloat(consDebt.Amount.toFixed(2)) : 0
    };
  });

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
    color: "#000",
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
            <p key={index} style={{ margin: "2px 0", color: entry.color, fontSize: "12px" }}>
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
      <div style={containerStyle}>
        {/* Chart 1: Return on Networth Vs Long Term Advances to Long Term Borrowing */}
        <div style={chartCardStyle}>
          <div style={titleStyle}>
            Return on Networth Vs Long Term Advances to Long Term Borrowing
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={chart1Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#666" }}
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
                axisLine={{ stroke: "#666" }}
                label={{ 
                  value: "Value (in Percentage)", 
                  angle: -90, 
                  position: "insideLeft", 
                  fontSize: 12 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                iconType="rect"
                iconSize={10}
              />
              <Bar 
                dataKey="StandaloneROE" 
                fill="#004d66" 
                name="Return on Networth - Standalone"
                barSize={25}
              />
              <Bar 
                dataKey="ConsolidatedROE" 
                fill="#0088aa" 
                name="Return on Networth - Consolidated"
                barSize={25}
              />
              <Line 
                type="monotone" 
                dataKey="StandaloneLT" 
                stroke="#ffc107" 
                strokeWidth={2}
                name="Long Term Advances to Long Term Borrowing - Standalone"
                dot={{ r: 4, fill: "#ffc107" }}
              />
              <Line 
                type="monotone" 
                dataKey="ConsolidatedLT" 
                stroke="#ff9800" 
                strokeWidth={2}
                name="Long Term Advances to Long Term Borrowing - Consolidated"
                dot={{ r: 4, fill: "#ff9800" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Current Ratio Vs Return on Debt Equity Ratio */}
        <div style={chartCardStyle}>
          <div style={titleStyle}>
            Current Ratio Vs Return on Debt Equity Ratio
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={chart2Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#666" }}
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
                axisLine={{ stroke: "#666" }}
                label={{ 
                  value: "Value (in Percentage)", 
                  angle: -90, 
                  position: "insideLeft", 
                  fontSize: 12 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                iconType="rect"
                iconSize={10}
              />
              <Bar 
                dataKey="StandaloneCurrentRatio" 
                fill="#004d66" 
                name="Current Ratio - Standalone"
                barSize={25}
              />
              <Bar 
                dataKey="ConsolidatedCurrentRatio" 
                fill="#0088aa" 
                name="Current Ratio - Consolidated"
                barSize={25}
              />
              <Line 
                type="monotone" 
                dataKey="StandaloneDebtEquity" 
                stroke="#ffc107" 
                strokeWidth={2}
                name="Debt Equity Ratio - Standalone"
                dot={{ r: 4, fill: "#ffc107" }}
              />
              <Line 
                type="monotone" 
                dataKey="ConsolidatedDebtEquity" 
                stroke="#ff9800" 
                strokeWidth={2}
                name="Debt Equity Ratio - Consolidated"
                dot={{ r: 4, fill: "#ff9800" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ComparisonCharts;