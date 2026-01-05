import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function formatLacs(value) {
  return (value / 100000).toLocaleString("en-IN");
}

function AssetLiabilityChart({ data }) {
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
          Asset & Liability Breakup
        </h2>

        <p style={{ 
          color: "#666", 
          margin: "0 0 20px 0",
          fontSize: "14px",
          textAlign: "center"
        }}>
          Asset are in Blue & Liabilities are in Green
        </p>

        <ResponsiveContainer width="100%" height={600}>
          <BarChart 
            data={data}
            margin={{ top: 40, right: 70, left: 45, bottom: 40 }}
            barSize={18}
            barGap={15}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 13 }}
              label={{ value: 'Financial Years', position: 'insideBottom', offset: -10, fill: '#666' }}
            />
            <YAxis 
              tickFormatter={formatLacs}
              axisLine={false}
              tickLine={false}
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

            {/* Assets (Blue shades) - Stacked */}
            <Bar dataKey="tangibleAssets" name="Assets" stackId="assets" fill="#0a1e5e" />
            <Bar dataKey="investments" name="Investments" stackId="assets" fill="#1a3a8a" />
            <Bar dataKey="loansAndAdvances" name="Loans and Advances" stackId="assets" fill="#2563eb" />
            <Bar dataKey="inventory" name="Inventory" stackId="assets" fill="#3b82f6" />
            <Bar dataKey="tradeReceivables" name="Trade Receivables" stackId="assets" fill="#60a5fa" />
            <Bar dataKey="cashAndBank" name="Cash and Bank" stackId="assets" fill="#93c5fd" />
            <Bar dataKey="otherAssets" name="Other Assets" stackId="assets" fill="#bfdbfe" />

            {/* Liabilities (Green shades) - Stacked */}
            <Bar dataKey="netWorth" name="Net Worth" stackId="liabilities" fill="#14532d" />
            <Bar dataKey="borrowings" name="Borrowings" stackId="liabilities" fill="#166534" />
            <Bar dataKey="otherNonCurrentLiabilities" name="Other Non-Current Liabilities" stackId="liabilities" fill="#16a34a" />
            <Bar dataKey="currentLiabilities" name="Current Liabilities" stackId="liabilities" fill="#4ade80" />
            <Bar dataKey="deferredTax" name="Deferred Tax" stackId="liabilities" fill="#86efac" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AssetLiabilityChart;