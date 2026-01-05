function ComplianceAndFilings({ data }) {
  if (!data) return null;

  const formatDate = (date) =>
    date && date !== "NA"
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "NA";

  return (
    <>
      <style>{`
        .compliance-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px 18px;
          page-break-inside: avoid;
        }

        .compliance-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 16px;
          color: #1e3a8a;
          margin-bottom: 12px;
        }

        .compliance-table {
          width: 100%;
          border-collapse: collapse;
        }

        .compliance-table th {
          text-align: left;
          background: #f3f4f6;
          padding: 8px 10px;
          font-weight: 600;
          border: 1px solid #e5e7eb;
          width: 55%;
        }

        .compliance-table td {
          padding: 8px 10px;
          border: 1px solid #e5e7eb;
          font-weight: 600;
        }
      `}</style>

      <div className="compliance-card">
        <div className="compliance-header">
          📅 Compliance & Filings
        </div>

        <table className="compliance-table">
          <tbody>
            <tr>
              <th>Last AGM Held On</th>
              <td>{formatDate(data.dateOfLastAGM)}</td>
            </tr>

            <tr>
              <th>Balance Sheet Date</th>
              <td>{formatDate(data.dateOfBalanceSheet)}</td>
            </tr>

            <tr>
              <th>Directors</th>
              <td>
                {`Current: ${data.directors}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ComplianceAndFilings;
