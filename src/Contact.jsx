import { useState } from "react";
import { useEffect } from "react";
import client from "./sanity";
import contactImage from "./assets/hero.jpeg";

const query = `
*[_type == "contact"][0]{
  _id,
  phone,
  email,
  linkedinLink,
  linkedinDisplayName,
  instagramLink,
  instagramDisplayName
}
`;

function Contact() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await client.fetch(query);
        setContactData(res);
      } catch (e) {
        console.error("Error fetching contact data:", e);
      }
    }
    fetchdata();
  }, []);

  const contactInfo = contactData
    ? [
        {
          type: "phone",
          value: contactData.phone,
          display: "Phone",
          icon: "📱",
          href: `tel:${contactData.phone}`,
        },
        {
          type: "email",
          value: contactData.email,
          display: "Email",
          icon: "✉️",
          href: `mailto:${contactData.email}`,
        },
        {
          type: "linkedin",
          value: "@" + contactData.linkedinDisplayName,
          display: "LinkedIn",
          icon: "💼",
          href: contactData.linkedinLink,
        },
        {
          type: "instagram",
          value: "@" + contactData.instagramDisplayName,
          display: "Instagram",
          icon: "📷",
          href: contactData.instagramLink,
        },
      ]
    : [];

  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="contact"
      className="min-h-dvh bg-secondary text-primary-text relative py-30 px-10 w-full flex flex-col justify-center"
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
