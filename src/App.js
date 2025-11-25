import { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import About from "./about";
import Contact from "./contact";
import Dashboard from "./dashboard";
import Signup from "./signup";
import Login from "./login";
import Particle from "./asset/Particle";
import "./index.css";
import TypingIntro from "./asset/typingintro";
import Introduction from "./asset/introduction";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [section, setSection] = useState(() => window.location.hash.replace("#", "") || "home");

  useEffect(() => {
    if (window.location.hash.replace("#", "") !== section) {
      window.location.hash = section;
    }
  }, [section]);

  useEffect(() => {
    const onHashChange = () => setSection(window.location.hash.replace("#", "") || "login");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
  }, [token]);


  const authPages = section === "";
  const logout = () => { setToken(null); setSection("home"); };

  return (
    <div className="app-container">
      <Particle />
      {!authPages && <Header setSection={setSection} token={token} handleLogout={logout} />}

      
      
      
      <main className="main-content">
        {/* Home Section */}
        
       {/* Home Section */}
{section === "home" && (
  <section className="home-section relative">
    <TypingIntro />
  </section>
)}

{section === "home" && (
  <section className="home-section relative">
    <Introduction />
  </section>
)}



        {/* About Section */}
        {section === "about" && (
          <section className="about-section">
            <About />
          </section>
        )}

        {/* Contact Section */}
        {section === "contact" && (
          <section className="contact-section">
            <Contact />
          </section>
        )}

        {/* Dashboard Section */}
        {section === "dashboard" && (
          <section className="dashboard-section">
            {token ? (
              <Dashboard token={token} />
            ) : (
              <div className="dashboard-warning">
                <p>Login required to access the dashboard.</p>
                <button className="btn" onClick={() => setSection("login")}>Go to Login</button>
              </div>
            )}
          </section>
        )}

        {/* Login Section */}
        {section === "login" && (
          <section className="login-section">
            <Login setToken={setToken} setSection={setSection} />
          </section>
        )}

        {/* Signup Section */}
        {section === "signup" && (
          <section className="signup-section">
            <Signup setToken={setToken} setSection={setSection} />
          </section>
        )}
      </main>

      {!authPages && <Footer />}
    </div>
  );
}
