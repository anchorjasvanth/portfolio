import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  let layout =
    "fixed top-5 left-0 right-0 mx-auto w-98/100 z-50 flex justify-between items-center";
  let buttonStyle = "pl-6 cursor-pointer py-5 w-full rounded-3xl";

  return (
    <nav
      className={
        " bg-black/50  text-white/90 backdrop-blur px-12 lg:px-12 py-6 md:py-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:text-base lg:text-2xl rounded-4xl " +
        layout
      }
    >
      <div
        className="text-3xl md:text-5xl xl:text-6xl font-extrabold cursor-pointer"
        onClick={() => {
          document
            .getElementById("home")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        JASVANTH
      </div>

      <div className="flex items-center gap-3 lg:gap-20">
        <ul
          className={`hidden lg:flex gap-20 items-center ${open ? "" : ""}`}
          aria-label="Primary navigation"
        >
          <button
            onClick={() => {
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={buttonStyle}
          >
            HOME
          </button>
          <button
            onClick={() => {
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={buttonStyle}
          >
            ABOUT
          </button>
          <button
            onClick={() => {
              document
                .getElementById("gallery")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={buttonStyle}
          >
            GALLERY
          </button>
          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={buttonStyle}
          >
            CONTACT
          </button>
        </ul>

        <button
          className="lg:hidden p-2 rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className="block w-6 h-[2px] bg-white mb-1 transform transition duration-300"
            style={{
              transform: open ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            className="block w-6 h-[2px] bg-white mb-1 transition duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-6 h-[2px] bg-white transition duration-300"
            style={{
              transform: open ? "-rotate(45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      </div>

      <div
        className={`lg:hidden absolute left-0 right-0 top-[90px] z-40 bg-black/90 backdrop-blur-lg rounded-b-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-4 items-start">
          <li
            className={`transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: open ? "0ms" : "300ms" }}
          >
            <button
              className={buttonStyle}
              onClick={() => {
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
                setOpen(false);
              }}
            >
              HOME
            </button>
          </li>
          <li
            className={`transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: open ? "100ms" : "200ms" }}
          >
            <button
              className={buttonStyle}
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
                setOpen(false);
              }}
            >
              ABOUT
            </button>
          </li>
          <li
            className={`transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: open ? "200ms" : "100ms" }}
          >
            <button
              className={buttonStyle}
              onClick={() => {
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
                setOpen(false);
              }}
            >
              GALLERY
            </button>
          </li>
          <li
            className={`transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: open ? "300ms" : "0ms" }}
          >
            <button
              className={buttonStyle}
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
                setOpen(false);
              }}
            >
              CONTACT
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
