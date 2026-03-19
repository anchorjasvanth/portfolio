import { useState } from "react";
import contactImage from "./assets/Contact .jpeg";

function Contact() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const contactInfo = [
    {
      type: "phone",
      value: "+91 99999 99999",
      display: "Phone",
      icon: "📱",
      href: "tel:+919999999999",
    },
    {
      type: "email",
      value: "jaswanth.kumar@example.com",
      display: "Email",
      icon: "✉️",
      href: "mailto:jaswanth.kumar@example.com",
    },
    {
      type: "linkedin",
      value: "linkedin.com/in/jaswanth-kumar",
      display: "LinkedIn",
      icon: "💼",
      href: "https://linkedin.com/in/jaswanth-kumar",
    },
    {
      type: "instagram",
      value: "@jaswanth",
      display: "Instagram",
      icon: "📷",
      href: "https://instagram.com/jaswanth",
    },
  ];

  return (
    <section className="min-h-screen bg-black text-primary-text relative overflow-hidden">
      <div className="min-h-screen container mx-auto px-6 py-20 flex flex-col justify-between">
        {/* Tagline */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent animate-pulse">
              GET IN TOUCH
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Let's collaborate and create something amazing together. Feel free
              to reach out through any of the channels below.
            </p>
          </div>
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Contact Image */}
            <img
              src={contactImage}
              alt="Contact"
              className="relative h-full rounded-2xl shadow-2xl"
            />
            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.type}
                  href={item.href}
                  target={
                    item.type !== "phone" && item.type !== "email"
                      ? "_blank"
                      : "_self"
                  }
                  rel="noopener noreferrer"
                  className="block"
                  onMouseEnter={() => setHoveredItem(item.type)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div
                    className={`
                    p-4 rounded-xl border transition-all duration-300 transform
                    ${
                      hoveredItem === item.type
                        ? "border-primary bg-gray-900 scale-105 shadow-lg shadow-primary/20"
                        : "border-gray-500 bg-black/50 hover:border-gray-600"
                    }
                  `}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`
                        text-3xl transition-transform duration-300
                        ${hoveredItem === item.type ? "scale-125 rotate-12" : "scale-100"}
                      `}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">
                          {item.display}
                        </p>
                        <p className="text-lg font-medium text-primary-text">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2026, All Rights Reserved</p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <span>📍</span>
              Based in Bangalore, India
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Contact;
