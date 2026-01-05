import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function formatLacs(value) {
  return (value / 100000).toLocaleString("en-IN");
}

function PLComparisonChartConsolidated({ data, title = "Profit & Loss Financials : Comparision Graph (Consolidated)" }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ 
      marginTop: "40px",
      padding: "30px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{ width: "75%", maxWidth: "100%" }}>
        <h3 style={{ 
          fontSize: "20px", 
          fontWeight: "600",
          margin: "0 0 5px 0",
          color: "#333"
        }}>
          {title}
        </h3>
        <p style={{ 
          color: "#999", 
          margin: "0 0 30px 0",
          fontSize: "14px"
        }}>
          Operating Revenue, EBDITA & PAT
        </p>

        <ResponsiveContainer width="100%" height={450}>
          <BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#666', fontSize: 13 }}
              label={{ value: 'Financial Years', position: 'insideBottom', offset: -10, fill: '#666' }}
            />
            <YAxis 
              tickFormatter={formatLacs}
              tick={{ fill: '#666', fontSize: 13 }}
              label={{ value: 'Amount (Rs. in Lacs)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }, dx: -25, fill: '#666' }}
            />
            <Tooltip 
              formatter={(v) => formatLacs(v)}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
              iconSize={12}
            />
            
            <Bar dataKey="operatingRevenue" name="Operating Revenue" fill="#0a1e5e" />
            <Bar dataKey="ebdita" name="EBDITA" fill="#2563eb" />
            <Bar dataKey="pat" name="PAT" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PLComparisonChartConsolidated;