import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      alert("Account created successfully!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.titleBar}>
            <h1 style={styles.title}>Create Account</h1>
          </div>
          <p style={styles.subtitle}>Join us and start your journey today</p>
        </div>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordBox}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eye}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={isLoading}
            style={{
              ...styles.button,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </div>
<div style={styles.footer}>
  <p style={styles.footerText}>
    Already have an account?{" "}
    <Link to="/login" style={styles.link}>
      Login
    </Link>
  </p>
</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        input:focus {
          outline: none;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }

        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }

        button:active:not(:disabled) {
          transform: translateY(0);
        }

        span:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
   background: "#d8dde8ff",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "50px 45px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "36px",
  },
  titleBar: {
    height: "50px",
    background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 50%, #fbbf24 100%)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0",
    letterSpacing: "-0.3px",
    fontFamily: "'Inter', sans-serif",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    margin: 0,
    fontWeight: "400",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "14px 16px",
    fontSize: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "white",
    transition: "all 0.2s ease",
    fontFamily: "'Inter', sans-serif",
    color: "#111827",
  },
  passwordBox: {
    position: "relative",
    width: "100%",
  },
  eye: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "20px",
    userSelect: "none",
    transition: "opacity 0.2s ease",
    opacity: 0.6,
  },
  button: {
    padding: "15px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    background: "#2563eb",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "8px",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
  },
  footer: {
    marginTop: "24px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
};

export default Signup;