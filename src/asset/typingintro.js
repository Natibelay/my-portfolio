import { useState, useEffect } from "react";
import ima from "./c.png"; // make sure this path is correct

export default function TypingIntro() {
  const text = "Website Developer.";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Typing effect
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    marginTop: "15vh",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: isMobile ? "auto" : "-5vw",
    marginRight: isMobile ? "auto" : "-5vw",
    maxWidth: "90vw",
  };

  const textContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: isMobile ? "center" : "flex-start",
  };

  const helloStyle = {
    color: "#ffffff",
    fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
    fontWeight: "bold",
    fontFamily: "Courier, monospace",
  };

  const nameStyle = {
    color: "#ffffff",
    fontSize: "clamp(1.2rem, 4vw, 2rem)",
    fontWeight: "bold",
    fontFamily: "Courier, monospace",
    marginTop: "0.5rem",
  };

  const typingStyle = {
    color: "#0c00e7ff",
    fontSize: "clamp(1.2rem, 4vw, 2rem)",
    fontWeight: "bold",
    fontFamily: "Courier, monospace",
    marginTop: "0.5rem",
  };

  const cursorStyle = {
    color: "#780000ff",
    fontWeight: "bold",
    animation: "blink 1s infinite",
  };

  const imageStyle = {
    width: isMobile ? "20%" : "20%",
    maxWidth: "200px",
    marginTop: isMobile ? "2rem" : "0",




  };

  

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h1 style={helloStyle}>Hello there</h1>
        <h2 style={nameStyle}>I am Natnael Belayneh</h2>
        <h2 style={typingStyle}>
          {displayedText}
          <span style={cursorStyle}>|</span>
        </h2>
      </div>
      <img src={ima} alt="Programmer" style={imageStyle}  
      />

      
      <style>
        
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
