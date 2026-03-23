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
import client from "./sanity";

const PLACEHOLDER_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDLjpJJOOKIfODUeHae58oLEZNn9xTSDzlDT80RQk94UK5NS0p1fYpzU5nMA2gzLn-GeczDaxiDHT1gf231VkOOfWk6U3WWTS5GNOzt8ZNpVNd_m6tjd8zQ7jm613qqvt3Mp0zdwvh8niciBk0xEIojS0I6U61_6skVRnfsw40WcEEOfSSBlWXK72lwKT9Ad4H17Hz8dNHaBm6R7wxmUtetTujAYDadeEiLXdAVwT9cnDchhdS1E4a9tPbEbyky1TsjGakFQqK483-4";

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "testimonial"]{
      _id,
      name,
      position,
      photo{
        asset->{ url }
      },
      review
    }`;

    async function fetchTestimonials() {
      try {
        const res = await client.fetch(query);
        const mapped = res.map((testi) => ({
          quote: testi.review?.[0]?.children?.[0]?.text || "No review provided",
          author: testi.name,
          role: testi.position,
          image: testi.photo?.asset?.url || PLACEHOLDER_IMAGE,
        }));
        setTestimonials(mapped);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching testimonials:", e);
        setIsLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (isLoading) {
    return (
      <section
        id="testi"
        className="bg-primary min-h-screen relative py-30 px-[10%] flex flex-col justify-center items-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-text"></div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testi"
      className="bg-primary min-h-screen relative py-30 px-[10%] flex flex-col justify-between"
    >
      <div className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter mb-[10%]">
        TESTIMONIALS
      </div>
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;

              if (swipe < -100 || velocity.x < -500) {
                nextTestimonial();
              } else if (swipe > 100 || velocity.x > 500) {
                prevTestimonial();
              }
            }}
            className="bg-secondary text-primary-text p-12 md:p-16 rounded-xl shadow-2xl flex flex-col justify-between min-h-[400px]"
          >
            <p className="text-primary-text text-2xl md:text-3xl leading-relaxed mb-12 italic font-medium">
              "{testimonials[currentTestimonial].quote}"
            </p>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-stone-200 ring-4 ring-primary">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].author}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-headline font-bold text-xl text-primary-text leading-none">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="font-label text-sm uppercase tracking-wider text-primary-text mt-2">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex  justify-center items-center mt-12 gap-6">
          <button
            onClick={prevTestimonial}
            className="w-14 h-14 rounded-full bg-secondary text-primary-text flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg hover:bg-secondary/80"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 bg-secondary/60  rounded-full transition-all ${i === currentTestimonial ? "bg-secondary w-6" : "bg-secondary/20"}`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="w-14 h-14 rounded-full bg-secondary text-primary-text flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg hover:bg-secondary/80"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
