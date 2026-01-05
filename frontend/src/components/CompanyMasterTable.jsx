function CompanyMasterTable({ data }) {
  if (!data) return null;

  const isActive =
    typeof data.status === "string" &&
    data.status.toLowerCase().includes("active");

  return (
    <>
      <style>{`
        .company-snapshot {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-top: 20px;
          overflow: hidden;
          page-break-inside: avoid;
        }

        .company-snapshot table {
          width: 100%;
          border-collapse: collapse;
        }

        .company-snapshot th {
          text-align: left;
          background: #f3f4f6;
          padding: 10px 12px;
          font-weight: 600;
          color: #374151;
          width: 30%;
          border-bottom: 1px solid #e5e7eb;
        }

        .company-snapshot td {
          padding: 10px 12px;
          color: #111827;
          border-bottom: 1px solid #e5e7eb;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${isActive ? "#16a34a" : "#dc2626"};
        }

        @media print {
          .company-snapshot {
            box-shadow: none;
          }
        }
      `}</style>

      <div className="company-snapshot">
        <table>
          <tbody>
            <tr>
              <th>Company Name</th>
              <td>{data.companyName}</td>
            </tr>

            <tr>
              <th>CIN</th>
              <td>{data.cin}</td>
            </tr>

            <tr>
              <th>Company Status</th>
              <td>
                <span className="status">
                  <span className="status-dot"></span>
                  {data.status}
                </span>
              </td>
            </tr>

            <tr>
              <th>Category</th>
              <td>{data.category}</td>
            </tr>

            <tr>
              <th>Class</th>
              <td>{data.classOfCompany}</td>
            </tr>

            <tr>
              <th>Sub-Category</th>
              <td>{data.subCategory}</td>
            </tr>

            <tr>
              <th>Date of Incorporation</th>
              <td>{data.dateOfIncorporation}</td>
            </tr>

            <tr>
              <th>Email ID</th>
              <td>{data.email}</td>
            </tr>

            <tr>
              <th>Website</th>
              <td>{data.webAddress}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CompanyMasterTable;
