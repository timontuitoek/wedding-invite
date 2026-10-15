import React, { useState } from 'react';
import backgroundImage from '../images/homage_page_background.png';  // Background image path

function GetInTouch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Add submission logic here (backend or email)
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Sage tint overlay */}
      <div className="absolute inset-0 contact-overlay" />

      <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32 text-white">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">Get in Touch</h1>
          <p className="text-base sm:text-lg text-ivory-100 italic">
            "We'd love to hear from you! Drop us a message and we'll get back to you soon."
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm border border-[var(--w-border)]/50 rounded-xl p-6 shadow-lg space-y-4">
              {/* Name Field */}
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 sm:p-4 bg-white text-sage-900 rounded-lg border border-[var(--w-border)] focus:outline-none focus:ring-2 focus:ring-[var(--w-rose-300)]"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 sm:p-4 bg-white text-sage-900 rounded-lg border border-[var(--w-border)] focus:outline-none focus:ring-2 focus:ring-[var(--w-rose-300)]"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="mb-4">
                <textarea
                  name="message"
                  className="w-full p-3 sm:p-4 bg-white text-sage-900 rounded-lg border border-[var(--w-border)] focus:outline-none focus:ring-2 focus:ring-[var(--w-rose-300)] h-32"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-wedding-primary font-semibold"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm border border-[var(--w-border)]/50 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-[var(--w-text)] mb-4">Thank You!</h2>
              <p className="text-lg text-[var(--w-text-secondary)]">Your message has been received, and we will get back to you soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetInTouch;