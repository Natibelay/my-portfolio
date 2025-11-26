import { useState } from "react";
import "./contact.css";

export default function Contact({ title = "Contact Me", buttonText = "Send Message" }) {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const { name, message } = formData;

  // Update form fields
  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert("Both fields are required!");
      return;
    }

    try {
      const res = await fetch("https://my-portfolio-8-xqei.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", message: "" });
      } else {
        alert(data.message || "Failed to send message.");
      }
    } catch (err) {
      alert("Error sending message: " + err.message);
    }
  };

  return (
    <main className="contact-main">
      <section className="contact-container">
        <h2>{title}</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => updateField("message", e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">{buttonText}</button>
        </form>

        {submitted && (
          <p className="success-message">Thank you! Your message has been sent.</p>
        )}
      </section>
    </main>
  );
}
