import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <span style={styles.logoStartup}>STARTUP</span>
            <span style={styles.logoVisors}>VISORS</span>
          </div>

          <div style={styles.navLinks}>
            <a href="#home" style={styles.navLink}>Home</a>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#features" style={styles.navLink}>Features</a>
            <a href="#faqs" style={styles.navLink}>FAQs</a>
            <a href="#pricing" style={styles.navLink}>Pricing</a>
            <a href="#contact" style={styles.navLink}>Contact Us</a>
            
            <div style={styles.authButtons}>
              <button 
                onClick={() => navigate("/login")} 
                style={styles.loginBtn}
              >
                Login
              </button>
              <button 
                onClick={() => navigate("/signup")} 
                style={styles.signupBtn}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          {/* Trust Badge */}
          <div style={styles.trustBadge}>
            <span style={styles.star}>⭐</span>
            <span style={styles.trustText}>TRUSTED BY 500+ BRANDS ALREADY</span>
          </div>

          {/* Main Heading */}
          <h2 style={styles.mainHeading}>
            {/* <span style={styles.headingLine1}>
              Know Exactly What's{" "}
              <span style={styles.headingDriving}>Driving</span>
            </span> */}
            Your <span style={styles.headingDriving}>Personalised</span> report.
            {/* <br />
            <span style={styles.headingLine2}>
              <span style={styles.headingDriving}>Sales</span>{" "}
              <span style={styles.headingInYour}>in Your</span>{" "}
              <span style={styles.headingD2C}>D2C Brand</span>
            </span> */}
          </h2>

          {/* Subheading */}
          <p style={styles.subheading}>
            No more guessing — see the true impact of your traffic, campaigns, and AI sources on revenue and conversions.
          </p>

          {/* CTA Buttons */}
          <div style={styles.ctaContainer}>
            <button style={styles.ctaPrimary}>
              Start Your Free Trial
            </button>
            <button style={styles.ctaSecondary}>
              USD 19/month Only
            </button>
          </div>

          {/* Fine Print */}
          <p style={styles.finePrint}>
            Free for 7 Days. No Credit Card Required. No GA4 Access Required.
          </p>
        </div>
      </section>

      {/* Bottom Section Preview */}
      <section style={styles.bottomSection}>
        <div style={styles.reportCard}>
          <h2 style={styles.reportHeading}>Full GA4 Analytics Report</h2>
          <div style={styles.reportPreview}>
            <div style={styles.reportBox}>
              <span style={styles.reportIcon}>📊</span>
              <span style={styles.reportText}>Default Data</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        a {
          text-decoration: none;
          transition: color 0.3s ease;
        }

        button {
          font-family: 'Inter', sans-serif;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        nav button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    background: `
      linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.95)),
      url('https://jooinn.com/images/white-brick-wall-2.jpg')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },
  nav: {
    background: "rgba(255, 255, 255, 0.98)",
    borderBottom: "1px solid #e5e7eb",
    padding: "16px 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(10px)",
  },
  navContainer: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },
  logoStartup: {
    color: "#1e40af",
  },
  logoVisors: {
    color: "#fbbf24",
  },
  navLinks: {
    display: "flex",
    gap: "40px",
    alignItems: "center",
  },
  navLink: {
    color: "#1f2937",
    fontSize: "15px",
    fontWeight: "600",
    position: "relative",
  },
  authButtons: {
    display: "flex",
    gap: "12px",
    marginLeft: "20px",
  },
  loginBtn: {
    background: "transparent",
    color: "#1e40af",
    fontSize: "15px",
    fontWeight: "600",
    padding: "10px 24px",
    borderRadius: "8px",
    border: "2px solid #1e40af",
    transition: "all 0.3s ease",
  },
  signupBtn: {
    background: "#2563eb",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    padding: "10px 24px",
    borderRadius: "8px",
    border: "2px solid #2563eb",
    transition: "all 0.3s ease",
  },
  hero: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "80px 40px 60px",
    textAlign: "center",
  },
  heroContent: {
    maxWidth: "1000px",
    margin: "0 auto",
    animation: "fadeInUp 0.8s ease-out",
  },
  trustBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(59, 130, 246, 0.1)",
    padding: "12px 24px",
    borderRadius: "50px",
    marginBottom: "40px",
    animation: "float 3s ease-in-out infinite",
  },
  star: {
    fontSize: "18px",
  },
  trustText: {
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  mainHeading: {
    fontSize: "64px",
    fontWeight: "800",
    lineHeight: "1.15",
    marginBottom: "24px",
    color: "#0f172a",
    letterSpacing: "-1px",
  },
  headingLine1: {
    display: "inline",
  },
  headingLine2: {
    display: "inline",
  },
  headingDriving: {
    color: "#1e40af",
    display: "inline-block",
  },
  headingInYour: {
    color: "#fbbf24",
    display: "inline-block",
  },
  headingD2C: {
    color: "#0f172a",
    display: "inline-block",
  },
  subheading: {
    fontSize: "20px",
    color: "#475569",
    lineHeight: "1.6",
    marginBottom: "48px",
    maxWidth: "800px",
    margin: "0 auto 48px",
    fontWeight: "500",
  },
  ctaContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  ctaPrimary: {
    background: "#2563eb",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    padding: "18px 40px",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
  },
  ctaSecondary: {
    background: "rgba(167, 243, 208, 0.6)",
    color: "#065f46",
    fontSize: "18px",
    fontWeight: "700",
    padding: "18px 40px",
    borderRadius: "12px",
    border: "2px solid rgba(16, 185, 129, 0.3)",
  },
  finePrint: {
    fontSize: "16px",
    color: "#1f2937",
    fontWeight: "600",
    marginTop: "24px",
  },
  bottomSection: {
    maxWidth: "1280px",
    margin: "60px auto 0",
    padding: "0 40px 80px",
  },
  reportCard: {
    background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    borderRadius: "24px",
    padding: "48px",
    boxShadow: "0 20px 60px rgba(37, 99, 235, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  reportHeading: {
    color: "white",
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "32px",
    textAlign: "left",
  },
  reportPreview: {
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  reportBox: {
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    padding: "24px 40px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
  },
  reportIcon: {
    fontSize: "32px",
  },
  reportText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#92400e",
  },
};

export default LandingPage;