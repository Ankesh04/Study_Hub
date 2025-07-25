import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_new6szj",     // 🔁 Replace with your EmailJS service ID
        "template_alpkcol",    // 🔁 Replace with your EmailJS template ID
        form.current,
        "L46AIPjAO9pbTQr-d"      // 🔁 Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatusMessage("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatusMessage("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <label htmlFor="name">Your Name</label>
        <input type="text" name="from_name" id="name" required />

        <label htmlFor="email">Your Email</label>
        <input type="email" name="from_email" id="email" required />

        <label htmlFor="message">Your Message</label>
        <textarea name="message" id="message" rows="5" required />

        <button type="submit">Send Message</button>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </form>
    </div>
  );
};

export default Contact;
