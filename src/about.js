import React, { useState } from "react";

export default function About() {
  const [section, setSection] = useState("overview");

  const profileSections = {
    overview: {
      title: "Professional Overview",
      content:
        "I am a passionate and detail-oriented Full-Stack Web Developer with hands-on experience in building dynamic and responsive web applications using React and Next.js. I have strong proficiency in both SQL and NoSQL databases, enabling me to design efficient, scalable, and secure data architectures for diverse applications.",
    },
    frontend: {
      title: "Frontend Development",
      content:
        "Creating interactive, user-friendly interfaces using React, Next.js, and modern CSS frameworks like Tailwind CSS. I focus on building responsive, accessible, and engaging user experiences.",
    },
    backend: {
      title: "Backend & Database",
      content:
        "Designing RESTful APIs, managing relational databases (SQL), and working with NoSQL databases for flexible data storage solutions. Ensuring secure and scalable backend architectures.",
    },
    optimization: {
      title: "Performance & Optimization",
      content:
        "Implementing best practices for fast, responsive, and maintainable web applications. Optimizing load times, reducing unnecessary re-renders, and using efficient algorithms.",
    },
    deployment: {
      title: "Deployment & Version Control",
      content:
        "Experience with Git, CI/CD pipelines, and cloud deployment platforms. Ensuring smooth application releases and collaborative development workflows.",
    },
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-white">
        🌐 My Web Developer Profile
      </h1>

      {/* Buttons to select section */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {Object.keys(profileSections).map((key) => (
          <button
            key={key}
            onClick={() => setSection(key)}
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
              section === key
                ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-200"
            }`}
          >
            {profileSections[key].title.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Fire-like animated box */}
      <div className="relative p-6 rounded-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 animate-[gradientFlow_6s_linear_infinite] blur-lg opacity-70"></div>
        <p className="relative text-white font-medium leading-relaxed">
          {profileSections[section].content}
        </p>
      </div>

      {/* Tailwind custom animation */}
      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-[gradientFlow_6s_linear_infinite] {
            background-size: 600% 600%;
          }
        `}
      </style>
    </div>
  );
}
