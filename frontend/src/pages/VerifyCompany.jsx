import { useState } from "react";
import { getBasicCompanyDetailsByCIN } from "../services/companyService";
import { useNavigate } from "react-router-dom";

export default function VerifyCompany() {
  const [cin, setCin] = useState("");
  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    try {
      const data = getBasicCompanyDetailsByCIN(cin);
      setCompany(data);
      setError("");
    } catch (err) {
      setCompany(null);
      setError(err.message);
    }
  };

  const handleConfirm = () => {
    // ✅ SET CIN VERIFIED FLAG (IMPORTANT)
    localStorage.setItem("cin_verified", "true");

    // Navigate to report page
    navigate("/report");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Verify Company</h1>
        <p style={styles.subtitle}>
          Enter the Company Identification Number (CIN) to retrieve company details
        </p>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            placeholder="Enter Company CIN (e.g., U12345AB1234PLC567890)"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleVerify()}
          />
          <button style={styles.verifyButton} onClick={handleVerify}>
            Verify Company
          </button>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        {company && (
          <div style={styles.resultCard}>
            <div style={styles.successBadge}>
              <span style={styles.checkIcon}>✓</span>
              <span>Company Verified</span>
            </div>

            <h2 style={styles.companyName}>{company.companyName}</h2>

            <table style={styles.table}>
              <tbody>
                <tr style={styles.tableRow}>
                  <td style={styles.tableLabel}>CIN</td>
                  <td style={styles.tableValue}>{company.cin}</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableLabel}>Status</td>
                  <td style={styles.tableValue}>
                    <span style={styles.statusBadge}>{company.status}</span>
                  </td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableLabel}>Address</td>
                  <td style={styles.tableValue}>{company.address}</td>
                </tr>
              </tbody>
            </table>

            <button
              style={styles.confirmButton}
              onClick={handleConfirm}
              onMouseEnter={(e) =>
                (e.target.style.background =
                  styles.confirmButtonHover.background)
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  styles.confirmButton.background)
              }
            >
              Confirm & Generate Report →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  card: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    padding: "40px",
    maxWidth: "700px",
    width: "100%",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#718096",
    textAlign: "center",
    marginBottom: "32px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px",
  },
  input: {
    padding: "14px 18px",
    fontSize: "15px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  verifyButton: {
    padding: "14px 24px",
    fontSize: "15px",
    fontWeight: "600",
    color: "white",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  errorBox: {
    background: "#fff5f5",
    border: "1px solid #feb2b2",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  errorIcon: {
    fontSize: "20px",
  },
  errorText: {
    color: "#c53030",
    margin: 0,
    fontSize: "14px",
  },
  resultCard: {
    background: "#f7fafc",
    borderRadius: "12px",
    padding: "28px",
    marginTop: "24px",
    border: "1px solid #e2e8f0",
  },
  successBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#c6f6d5",
    color: "#22543d",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  checkIcon: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  companyName: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "24px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    marginBottom: "24px",
  },
  tableRow: {
    borderBottom: "1px solid #e2e8f0",
  },
  tableLabel: {
    padding: "16px 12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#4a5568",
    width: "30%",
    verticalAlign: "top",
  },
  tableValue: {
    padding: "16px 12px",
    fontSize: "14px",
    color: "#2d3748",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    background: "#bee3f8",
    color: "#2c5282",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
  },
  confirmButton: {
    width: "100%",
    padding: "14px 24px",
    fontSize: "15px",
    fontWeight: "600",
    color: "white",
    background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(72, 187, 120, 0.4)",
  },
  confirmButtonHover: {
    background: "linear-gradient(135deg, #38a169 0%, #2f855a 100%)",
  },
};
