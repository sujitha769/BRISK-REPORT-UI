function RegisteredOfficeAddress({ data }) {
  if (!data || !data.address) return null;

  // Split address into lines safely
  const addressLines = data.address
    .split(";")
    .map(line => line.trim())
    .filter(Boolean);

  return (
    <>
      <style>{`
        .address-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px 18px;
          page-break-inside: avoid;
        }

        .address-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 16px;
          color: #1e3a8a;
          margin-bottom: 12px;
        }

        .address-box {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 12px 14px;
          color: #111827;
          line-height: 1.6;
        }

        .address-line {
          margin-bottom: 4px;
        }
      `}</style>

      <div className="address-card">
        <div className="address-header">
          📍 Registered Office Address
        </div>

        <div className="address-box">
          {addressLines.map((line, index) => (
            <div key={index} className="address-line">
              {line}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RegisteredOfficeAddress;
