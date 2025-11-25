import React from "react";
import { FaJsSquare, FaReact, FaNodeJs, FaPython, FaDatabase } from "react-icons/fa";
import { SiMongodb, SiTypescript, SiHtml5, SiCss3 } from "react-icons/si";
import "./introduction.css";

export default function SkillsMarquee({ speed = 20 /* seconds per loop (lower = faster) */ }) {
  // items to show (icon, label, background color)
 
 
  const skills = [
    { id: "js", icon: <FaJsSquare />, color: "#f7df1e", fg: "#000" },
    { id: "react", icon: <FaReact />, color: "#61dafb", fg: "#05273a" },
    { id: "ts", icon: <SiTypescript />, color: "#3178c6", fg: "#fff" },
    { id: "node", icon: <FaNodeJs />, color: "#3C873A", fg: "#fff" },
    { id: "mongo", icon: <SiMongodb />, color: "#4DB33D", fg: "#fff" },
    { id: "python", icon: <FaPython />, color: "#3776AB", fg: "#fff" },
    { id: "html", icon: <SiHtml5 />, color: "#e44d26", fg: "#fff" },
    { id: "css", icon: <SiCss3 />, color: "#1572B6", fg: "#fff" },
    { id: "db", icon: <FaDatabase />, color: "#6c5ce7", fg: "#fff" },
  ];
  
 

  // Duplicate array for seamless loop
  const track = [...skills, ...skills];

  return (

    <div className="marquee">
      {/* pass speed via CSS variable for easy control */ }
      <div className="skillfont " style={{fontFamily : "-apple-system", fontSize: "2rem", }}>
         <br/><br/> <h1> My Skills </h1> </div>
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="false"
      >
        {track.map((s, i) => (
          <div className="skill-item" key={`${s.id}-${i}`}>
            <div
              className="skill-box"
              style={{ background: s.color, color: s.fg }}
              title={s.id}
            >
              {s.icon}
            </div>
            <div className="skill-label">{s.id.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
