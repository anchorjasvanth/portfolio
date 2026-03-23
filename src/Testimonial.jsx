import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Instagram,
  Linkedin,
  Dribbble,
} from "lucide-react";

const testimonials = [
  {
    quote:
      "The vision for our brand identity was executed with surgical precision. The editorial approach truly sets our presence apart in a saturated market.",
    author: "Sarah Chen",
    role: "Creative Director, Nexus",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBd8sS9Y7fGTex0Wqp9_RRaTBAwGC_0GIGjA7MoF8W7gbBCV0p8Vo7Jsp1lWnpSzrdaELm2kF3UdZY8TyzPo_V8IANLUHNBj5gybQZ7c2EKPNPFEPTZkMkv0fTFNS3G5b4-SQxCLm-L8nYuY5YBSrCxDOCiXvb60EvrhOjN0ARu2ixqy3M9nv74nGeNGlrVzKKndzwxXN6MlVCPzoVWWhbtajTtvk2PKtoSNQFHO09u6z9OTzGrFtOK_kJPdvAuJwMa8HLGZel1dFXa",
  },
  {
    quote:
      "A rare combination of brutalist boldness and premium elegance. Our conversion rates increased by 40% after the redesign.",
    author: "Marcus Thorne",
    role: "Founder, Ember Tech",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvdoexCZ6hMfvLltjnaRaCpJB5QXYVRHyO-PwoI2TiZVr13oWveOZiDsWuAhJX9sqsCB7avrNcziJojTOcOXeOZaRRornncWIhLqPXM2PDl9U7aMInOVswt2A3CTnlbmF7Gk1WrWjAJfZKymkkiYMF6gk9Rl9xv1ucsNvysavQmbWhESw9qDpIgzNzKQZe3nqNypVSLFY3YVHjwmUNd_R49hnHMlWSkDizTk-yHmUwy-uU_nPfyPRlutYwqayHSmXsT-a8DDjz4mtQ",
  },
  {
    quote:
      "Working with this portfolio was like watching a high-end magazine come to life. The attention to spacing and rhythm is unmatched.",
    author: "Elena Rossi",
    role: "Head of Marketing, Vogue Digital",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLjpJJOOKIfODUeHae58oLEZNn9xTSDzlDT80RQk94UK5NS0p1fYpzU5nMA2gzLn-GeczDaxiDHT1gf231VkOOfWk6U3WWTS5GNOzt8ZNpVNd_m6tjd8zQ7jm613qqvt3Mp0zdwvh8niciBk0xEIojS0I6U61_6skVRnfsw40WcEEOfSSBlWXK72lwKT9Ad4H17Hz8dNHaBm6R7wxmUtetTujAYDadeEiLXdAVwT9cnDchhdS1E4a9tPbEbyky1TsjGakFQqK483-4",
  },
];

function Testimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-primary min-h-screen relative py-30 px-[10%] flex flex-col justify-between">
      <div className="text-4xl lg:text-5xl xl:text-8xl font-extrabold mb-[10%]">
        TESTIMONIALS
      </div>
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-secondary text-primary-text p-12 md:p-16 rounded-xl shadow-2xl flex flex-col justify-between min-h-[400px]"
          >
            <p className="text-on-surface text-2xl md:text-3xl leading-relaxed mb-12 italic font-medium">
              "{testimonials[currentTestimonial].quote}"
            </p>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-stone-200 ring-4 ring-brand-orange/20">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].author}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-headline font-bold text-xl text-on-surface leading-none">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="font-label text-sm uppercase tracking-wider text-on-surface/60 mt-2">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex  justify-center items-center mt-12 gap-6">
          <button
            onClick={prevTestimonial}
            className="bg-secondary text-primary-text w-14 h-14 rounded-full bg-brand-brown text-brand-orange flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? "bg-brand-brown w-6" : "bg-brand-brown/20"}`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="bg-secondary text-primary-text w-14 h-14 rounded-full bg-brand-brown text-brand-orange flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
