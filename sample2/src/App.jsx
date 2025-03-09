import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Contact from "./Pages/Contactus";
import Manageemployee from "./Pages/Manageemployee";
import Addemployee from "./Pages/Addemployee";
import Editemployee from "./Pages/Editemployee";
import Deleteemployee from "./Pages/Deleteemployee";
import Login from "./Pages/Login";
import "./App.css";

// 🔹 Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ❗ Always clear login data on refresh ❗
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          

          {/* Admin Only Routes */}
          <Route path="/manage-employee" element={<ProtectedRoute allowedRoles={["Administrator"]}><Manageemployee /></ProtectedRoute>} />
          <Route path="/manage-employee/add" element={<ProtectedRoute allowedRoles={["Administrator"]}><Addemployee /></ProtectedRoute>} />
          <Route path="/manage-employee/edit" element={<ProtectedRoute allowedRoles={["Administrator"]}><Editemployee /></ProtectedRoute>} />
          <Route path="/manage-employee/delete" element={<ProtectedRoute allowedRoles={["Administrator"]}><Deleteemployee /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
