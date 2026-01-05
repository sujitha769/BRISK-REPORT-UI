function CapitalStructure({ data }) {
  if (!data) return null;

  const formatAmount = (value) => {
    if (typeof value !== "number") return value || "NA";
    return `₹ ${value.toLocaleString("en-IN")}`;
  };

  return (
    <>
      <style>{`
        .capital-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px 18px;
          page-break-inside: avoid;
        }

        .capital-header {
          font-weight: 700;
          font-size: 16px;
          color: #1e3a8a;
          margin-bottom: 12px;
        }

        .capital-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          border-radius: 6px;
          margin-bottom: 8px;
          font-weight: 600;
        }
      `}</style>

      <div className="capital-card">
        <div className="capital-header">
          💰 Capital Structure
        </div>

        <div className="capital-row">
          <span>Authorized Capital</span>
          <span>{formatAmount(data.authorisedCapital)}</span>
        </div>

        <div className="capital-row">
          <span>Paid-Up Capital</span>
          <span>{formatAmount(data.paidUpCapital)}</span>
        </div>
      </div>
    </>
  );
}

export default CapitalStructure;
