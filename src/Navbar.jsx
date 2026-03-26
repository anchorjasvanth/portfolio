import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "HOME", id: "home" },
  { name: "ABOUT", id: "about" },
  { name: "GALLERY", id: "gallery" },
  { name: "TESTIMONIALS", id: "testi" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Close menu first, then scroll after animation completes
      setIsOpen(false);
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      console.warn(`Section with id "${id}" not found`);
    }
  };

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] transition-all duration-500 rounded-3xl overflow-hidden ${
        scrolled
          ? "bg-secondary/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-primary-text/10 py-3"
          : "bg-secondary/50 backdrop-blur-md border border-primary-text/5 py-5"
      }`}
    >
      <div className="px-6 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-headline font-black tracking-tighter cursor-pointer text-primary-text flex items-center gap-1"
          onClick={() => scrollToSection("home")}
        >
          JASVANTH
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="text-[13px] font-label font-bold tracking-[0.2em] text-primary-text/70 hover:text-primary transition-colors relative group uppercase"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("contact")}
            className="bg-primary text-secondary px-6 py-2.5 rounded-full font-label font-black text-[12px] tracking-widest hover:shadow-[0_0_20px_rgba(244,179,63,0.4)] transition-all uppercase"
          >
            GET IN TOUCH
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:hidden text-primary-text p-2 hover:bg-primary-text/10 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-secondary/95 backdrop-blur-2xl border-t border-primary-text/10"
          >
            <ul className="flex flex-col p-8 gap-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-3xl font-headline font-black tracking-tighter text-primary-text hover:text-primary transition-colors w-full text-left py-2"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => scrollToSection("contact")}
                className="mt-4 bg-primary text-secondary w-full py-4 rounded-2xl font-headline font-black text-xl tracking-tight shadow-xl"
              >
                GET IN TOUCH
              </motion.button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
