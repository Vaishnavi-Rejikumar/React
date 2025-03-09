import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";



const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch("https://localhost:7051/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        
        // ✅ Store login details
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        setIsAuthenticated(true);

        // ✅ Redirect based on role
        if (data.role === "Administrator") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="login-container">
      
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      
    </div>
  );
};

export default Login;
