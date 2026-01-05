import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import VerifyCompany from "./pages/VerifyCompany";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <Router>
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<VerifyCompany />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
