import React, { useEffect, useState } from "react";

/**
 * Index / Cover Page for Brisk Report
 * Now correctly references data-index-id attributes
 */
const ReportIndexPage = ({ data }) => {
  const [pageNumbers, setPageNumbers] = useState({});

  useEffect(() => {
    // Wait a bit for DOM to be ready
    const timer = setTimeout(() => {
      collectPageNumbers();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const collectPageNumbers = () => {
    const sections = {
      'company-masters': 'Company Masters',
      'company-kyc': 'Company KYC',
      'product-services': 'Product & Services',
      'ownership-details': 'Ownership Details',
      'pl-standalone': 'P&L Standalone',
      'cf-standalone': 'Cash Flow Standalone',
      'ratio-standalone': 'Ratio Analysis Standalone',
      'schedules-disclosures': 'Schedules & Disclosures',
      'risk-report': 'Risk Report',
      'financials-consolidated': 'Financials Consolidated',
      'standalone-vs-consolidated': 'Standalone vs Consolidated',
      'auditor-caro': 'Auditor & CARO',
      'group-related-parties': 'Group & Related Parties',
      'other-related-companies': 'Other Related Companies',
      'ratings-litigation': 'Ratings & Litigation',
      'compliance-delays': 'Compliance',
      'epf-establishment': 'EPF',
      'charge-search': 'Charges',
      'board-directors': 'Board & Directors',
      'legal-information': 'Legal Information'
    };

    const numbers = {};
    
    Object.keys(sections).forEach(sectionId => {
      // Find element by data-index-id attribute
      const element = document.querySelector(`[data-index-id="${sectionId}"]`);
      
      if (element) {
        const pageNum = calculatePageNumber(element);
        numbers[sectionId] = pageNum;
      }
    });

    setPageNumbers(numbers);
  };

  // Calculate page number based on element position
  const calculatePageNumber = (element) => {
    if (!element) return null;
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    
    // Standard page height of 1100px
    const pageHeight = 1100;
    const pageNumber = Math.floor(elementTop / pageHeight) + 1;
    
    return pageNumber;
  };

  if (!data) return null;

  const companyKYC = data?.ReportData?.CorporateDirectory?.CompanyKYC || {};
  const companyName = companyKYC.CompanyName || "—";
  const companyCIN = companyKYC.CompanyCIN || "—";
  
  // Get current date for PDF generation
  const today = new Date();
  const reportDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('-'); // Format: DD-MM-YYYY

  // Helper to get page number or return dash
  const pg = (sectionId) => pageNumbers[sectionId] || "—";

  return (
    <div style={styles.page}>
      {/* LEFT CONTENT */}
      <div style={styles.left}>
        {/* BRAND */}
        <div style={styles.brand}>
          <div style={styles.brandName}>
            <span style={styles.brandStartup}>STARTUP</span>
            <span style={styles.brandVisors}>VISORS</span>
          </div>
          <div style={styles.brandTag}>
            Business & Financial Intelligence
          </div>
        </div>

        {/* COMPANY NAME */}
        <h1 style={styles.companyName}>{companyName}</h1>

        {/* CIN */}
        <div style={styles.cin}>CIN : {companyCIN}</div>

        {/* REPORT DETAILS */}
        <div style={styles.reportBox}>
          <div>
            <strong>Report Name :</strong> Brisk Report
          </div>
          <div style={{ marginTop: "6px" }}>
            <strong>Report Date :</strong> {reportDate}
          </div>
        </div>

        {/* COLOR INDICATORS */}
        <div style={styles.dots}>
          <span style={{ ...styles.dot, background: "#0b4ea2" }} />
          <span style={{ ...styles.dot, background: "#28a745" }} />
          <span style={{ ...styles.dot, background: "#ffc107" }} />
          <span style={{ ...styles.dot, background: "#fd7e14" }} />
          <span style={{ ...styles.dot, background: "#dc3545" }} />
        </div>

        {/* SPACER */}
        <div style={styles.spacer} />

        {/* FOOTER */}
        <div style={styles.footer}>
          <span>www.startupvisors.com</span>
          <span>© Startupvisors</span>
        </div>
      </div>

      {/* RIGHT DESIGN STRIP */}
      <div style={styles.rightStrip} />
    </div>
  );
};

export default ReportIndexPage;

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    display: "flex",
    minHeight: "1100px",
    height: "1100px",
    width: "100%",
    background: "linear-gradient(to bottom, #eefaff, #ffffff)",
    fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
    pageBreakAfter: "always",
    boxSizing: "border-box",
  },

  left: {
    flex: 1,
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  brand: {
    marginBottom: "80px",
  },

  brandName: {
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  brandStartup: {
    color: "#1e3a8a",
  },

  brandVisors: {
    color: "#fbbf24",
  },

  brandTag: {
    fontSize: "13px",
    color: "#555",
    marginTop: "4px",
  },

  companyName: {
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "10px",
    color: "#333",
    textTransform: "uppercase",
  },

  cin: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "40px",
  },

  reportBox: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "30px",
  },

  dots: {
    display: "flex",
    gap: "10px",
    marginBottom: "40px",
  },

  dot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
  },

  spacer: {
    flex: 0,
    minHeight: "0px",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#555",
    paddingTop: "20px",
    marginTop: "40px",
  },

  rightStrip: {
    width: "260px",
    background:
      "linear-gradient(135deg, #0b4ea2 0%, #3bb4e5 50%, #0b4ea2 100%)",
    clipPath:
      "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%, 20% 80%, 0% 60%, 20% 40%, 0% 20%)",
  },
};