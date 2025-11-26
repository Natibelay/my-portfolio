import { useState } from "react";

export default function Signup({ setSection }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://my-portfolio-8-xqei.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! Token: " + data.token);
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
        <h2 style={{ marginBottom: "20px", color: "#0070f3" }}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            onChange={handleChange} 
            required 
            style={{ marginBottom: "15px", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
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
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: "20px" }}>{message}</p>

        {/* Link to login page */}
        <p style={{ marginTop: "20px", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <span 
            onClick={() => setSection("login")}
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
