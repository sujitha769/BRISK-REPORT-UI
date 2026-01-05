import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/report");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.titleBar}>
            <p style={styles.subtitle}>Sign in to continue your journey</p>
          </div>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
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
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.button,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account?{" "}
            <Link to="/signup" style={styles.link}>
              Sign up
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

        a:hover {
          text-decoration: underline;
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
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: "16px",
    color: "white",
    margin: 0,
    fontWeight: "600",
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

export default Login;