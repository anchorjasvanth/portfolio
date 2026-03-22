import { useState } from "react";
import contactImage from "./assets/hero.jpeg";

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
    <section
      id="contact"
      className="min-h-dvh bg-black text-white relative py-30 px-10 w-full flex flex-col justify-center"
    >
      <div className="h-full flex flex-col justify-center items-center w-fit mx-auto">
        <div className="text-4xl sm:text-7xl 2xl:text-9xl font-extrabold mb-10 2xl:mb-30 mt-20">
          GET IN TOUCH
        </div>
        <div className="flex flex-col justify-start gap-10 w-full">
          {contactInfo.map((item, index) => (
            <a
              key={item.type}
              href={item.href}
              target={
                item.type !== "phone" && item.type !== "email"
                  ? "_blank"
                  : "_self"
              }
              rel="noopener noreferrer"
              className="block gap-10 w-full"
              onMouseEnter={() => setHoveredItem(item.type)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className={`
                    p-4 rounded-xl transition-all duration-300 transform bg-primary animate-extend-right 
                    ${
                      hoveredItem === item.type
                        ? "border-primary bg-gray-900 scale-y-120 shadow-lg shadow-primary/20"
                        : "border-gray-500 bg-black/50 hover:border-gray-600"
                    }
                  `}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="flex items-center mx-auto gap-4">
                  <span
                    className={`
                        text-xl xl:text-3xl transition-transform duration-300
                        ${hoveredItem === item.type ? "scale-125 rotate-12" : "scale-100"}
                      `}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs sm:text-base 2xl:text-xl text-black mb-1">
                      {item.display}
                    </p>
                    <p className=" text-s sm:text-lg 2xl:text-2xl font-medium text-black">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
