import { useState } from "react";

export default function Login({ setToken, setSection }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token); // store token
        setMessage("Login successful!");
        
        // Redirect to home/dashboard after login
        setTimeout(() => {
          setSection("home"); // or "dashboard" if you prefer
        }, 500); // redirect after 0.5 seconds
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "20px", color: "#0070f3" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
            required 
            style={{ marginBottom: "15px", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            style={{ marginBottom: "20px", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <button 
            type="submit"
            style={{ padding: "10px", borderRadius: "6px", border: "none", background: "#0070f3", color: "#fff", cursor: "pointer" }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>{message}</p>

        {/* Link to signup page */}
        <p style={{ marginTop: "20px", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <span 
            onClick={() => setSection("signup")}
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
