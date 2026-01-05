import React, { useEffect, useState } from "react";

const ReportTOCPage = () => {
  const [pageNumbers, setPageNumbers] = useState({});

  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      collectPageNumbers();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const collectPageNumbers = () => {
    const sections = [
      'corporate-directory',
      'company-masters',
      'company-kyc',
      'product-services',
      'ownership-details',
      'pl-standalone',
      'cf-standalone',
      'ratio-standalone',
      'schedules-disclosures',
      'risk-report',
      'financials-consolidated',
      'standalone-vs-consolidated',
      'auditor-caro',
      'group-related-parties',
      'other-related-companies',
      'ratings-litigation',
      'compliance-delays',
      'epf-establishment',
      'charge-search',
      'board-directors',
      'legal-information'
    ];

    const numbers = {};
    
    sections.forEach(sectionId => {
      const element = document.querySelector(`[data-index-id="${sectionId}"]`);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const pageHeight = 1100;
        const pageNumber = Math.floor(elementTop / pageHeight) + 1;
        numbers[sectionId] = pageNumber;
      }
    });

    setPageNumbers(numbers);
  };

  const pg = (id) => pageNumbers[id] || "—";

  // Index structure matching your actual report
  const indexStructure = [
    {
      title: "Corporate Directory",
      items: [
        { label: "Company Masters", id: "company-masters" },
        { label: "Company KYC", id: "company-kyc" }
      ]
    },
    {
      title: "Product And Services",
      items: [
        { label: "NIC Products & Principal Products", id: "product-services" }
      ]
    },
    {
      title: "Ownership Details",
      items: [
        { label: "Shareholding Pattern", id: "ownership-details" }
      ]
    },
    {
      title: "Comparative Financials (Standalone)",
      items: [
        { label: "Profit & Loss Statement", id: "pl-standalone" },
        { label: "Cash Flow Statement", id: "cf-standalone" },
        { label: "Ratio Analysis", id: "ratio-standalone" }
      ]
    },
    {
      title: "Schedules And Disclosures (Financials Info)",
      items: [
        { label: "Revenue From Operations", id: "schedules-disclosures" },
        { label: "Other Expenses", id: "schedules-disclosures" },
        { label: "Borrowings", id: "schedules-disclosures" },
        { label: "Trade Receivables", id: "schedules-disclosures" },
        { label: "Equity Share Capital", id: "schedules-disclosures" },
        { label: "Contingent Liabilities", id: "schedules-disclosures" }
      ]
    },
    {
      title: "Risk Report",
      items: [
        { label: "Performance Risk Models", id: "risk-report" },
        { label: "Traditional Risk Models", id: "risk-report" }
      ]
    },
    {
      title: "Comparative Financials (Consolidated)",
      items: [
        { label: "Profit & Loss (Consolidated)", id: "financials-consolidated" },
        { label: "Balance Sheet (Consolidated)", id: "financials-consolidated" },
        { label: "Cash Flow (Consolidated)", id: "financials-consolidated" },
        { label: "Ratio Analysis (Consolidated)", id: "financials-consolidated" }
      ]
    },
    {
      title: "Standalone Vs Consolidated Financials",
      items: [
        { label: "P L Comparison", id: "standalone-vs-consolidated" },
        { label: "Financial Comparison", id: "standalone-vs-consolidated" }
      ]
    },
    {
      title: "Auditor Details and CARO Report",
      items: [
        { label: "Auditor KYC", id: "auditor-caro" },
        { label: "Auditor Qualification", id: "auditor-caro" },
        { label: "CARO Report", id: "auditor-caro" }
      ]
    },
    {
      title: "Group & Related Parties",
      items: [
        { label: "Subsidiary Financials", id: "group-related-parties" },
        { label: "Related Party Transactions", id: "group-related-parties" }
      ]
    },
    {
      title: "Other Related Companies",
      items: [
        { label: "By Directors", id: "other-related-companies" },
        { label: "By Emails", id: "other-related-companies" },
        { label: "By Addresses", id: "other-related-companies" }
      ]
    },
    {
      title: "Credit Ratings & Litigation",
      items: [
        { label: "Credit Ratings", id: "ratings-litigation" },
        { label: "Litigation Summary", id: "ratings-litigation" }
      ]
    },
    {
      title: "Compliance & Delays",
      items: [
        { label: "GST Compliance", id: "compliance-delays" },
        { label: "MCA Compliance", id: "compliance-delays" }
      ]
    },
    {
      title: "EPF & Establishment",
      items: [
        { label: "Establishment Details", id: "epf-establishment" }
      ]
    },
    {
      title: "Charge Search",
      items: [
        { label: "Charges", id: "charge-search" },
        { label: "Charges Profile", id: "charge-search" },
        { label: "Personal Guarantee", id: "charge-search" }
      ]
    },
    {
      title: "Board & Directors",
      items: [
        { label: "Board Members KYC", id: "board-directors" },
        { label: "Current Directors", id: "board-directors" },
        { label: "Past Directors", id: "board-directors" },
        { label: "New Directorships", id: "board-directors" }
      ]
    },
    {
      title: "Legal Information",
      items: [
        { label: "Legal Case Summary", id: "legal-information" },
        { label: "Open Cases", id: "legal-information" },
        { label: "Disposed Cases", id: "legal-information" },
        { label: "Unknown Status Cases", id: "legal-information" }
      ]
    }
  ];

  return (
    <div
      style={{
        pageBreakAfter: "always",
        padding: "40px 50px",
        fontFamily: "Arial, sans-serif",
        minHeight: "1100px"
      }}
    >
      <h2 
        style={{ 
          textAlign: "center", 
          marginBottom: "30px",
          fontSize: "24px",
          fontWeight: "700",
          color: "#333"
        }}
      >
        INDEX
      </h2>

      {indexStructure.map((section, sIdx) => (
        <div key={sIdx} style={{ marginBottom: "18px" }}>
          <div 
            style={{ 
              fontWeight: "700", 
              marginBottom: "6px",
              fontSize: "15px",
              color: "#0b4ea2"
            }}
          >
            {sIdx + 1}. {section.title}
          </div>

          {section.items.map((item, iIdx) => (
            <div
              key={iIdx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                marginLeft: "20px",
                lineHeight: "1.8",
                color: "#444"
              }}
            >
              <span>
                {sIdx + 1}.{iIdx + 1} {item.label}
              </span>
              <span style={{ fontWeight: "600", minWidth: "30px", textAlign: "right" }}>
                {pg(item.id)}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReportTOCPage;