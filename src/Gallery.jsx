import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  ExternalLink,
  X,
  Play,
} from "lucide-react";
import client from "./sanity";

function Gallery({ data }) {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  useEffect(() => {
    const typeMap = {
      FORMAL: "formal",
      "HIGH CROWD": "crowd",
      CLASSICAL: "classical",
    };

    const type = typeMap[data?.title?.toUpperCase()] || null;
    if (!type) {
      console.warn(`Unknown gallery title: ${data?.title}, fallback to formal`);
    }

    const query = `*[_type == "${type || "formal"}"] | order(_createdAt desc){
      _id,
      eventName,
      year,
      previewImage{ asset->{ url } },
      eventMedia[]{ _type, asset->{ url } },
      description
    }`;

    async function fetchData() {
      try {
        const res = await client.fetch(query);
        setEvents(res);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching gallery data:", e);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [data.title]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };
  useEffect(() => {
    if (events.length === 0 || isArchiveOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [events.length, isArchiveOpen, currentIndex]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (events.length === 0) return null;

  const currentEvent = events[currentIndex];
  const archiveMedia = currentEvent.eventMedia || [];

  return (
    <section className="relative py-24 px-8 bg-primary/5" id="gallery">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-end text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter">
            {data.title}
          </h2>
        </div>

        {/* Featured Card - Testimonial Style */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -100 || velocity.x < -500) {
                  nextSlide();
                } else if (swipe > 100 || velocity.x > 500) {
                  prevSlide();
                }
              }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-brown/5 flex flex-col md:flex-row min-h-[500px] cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {/* Image Side */}
              <div className="md:w-1/2 relative overflow-hidden group">
                <img
                  src={currentEvent.previewImage?.asset?.url}
                  alt={currentEvent.eventName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8 flex items-center gap-3 text-primary-text">
                  <Calendar size={18} className="text-brand-orange" />
                  <span className="font-headline font-bold text-xl">
                    {currentEvent.year}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight mb-6 leading-tight">
                  {currentEvent.eventName}
                </h3>

                <p className="line-clamp-9 md:line-clamp-none text-on-surface/70 text-lg leading-relaxed mb-10 italic">
                  "
                  {currentEvent.description?.[0]?.children?.[0]?.text ||
                    "No description available."}
                  "
                </p>

                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setIsArchiveOpen(true)}
                  className="flex cursor-pointer items-center gap-2 text-brand-brown font-headline font-bold uppercase tracking-widest text-sm group"
                >
                  View Full Archive{" "}
                  <ExternalLink
                    size={16}
                    className="group-hover:text-brand-orange transition-colors"
                  />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-12 gap-6">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-brand-brown text-brand-orange flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 bg-secondary/50 mx-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-brand-brown w-8"
                      : "bg-brand-brown/20 hover:bg-brand-brown/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-brand-brown text-brand-orange flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Archive Overlay Modal */}
      <AnimatePresence>
        {isArchiveOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-brown/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-brand-brown/10 flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="text-2xl font-headline font-extrabold tracking-tight text-brand-brown">
                    {currentEvent.eventName}
                  </h4>
                  <p className="text-brand-brown/60 font-label uppercase tracking-widest text-xs">
                    Event Archive — {currentEvent.year}
                  </p>
                </div>
                <button
                  onClick={() => setIsArchiveOpen(false)}
                  className="cursor-pointer w-12 h-12 rounded-full bg-secondary/5 text-secondary flex items-center justify-center hover:bg-secondary hover:text-primary-text transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content - Media Grid */}
              <div className="flex-1 overflow-y-auto p-8 hide-scrollbar">
                {archiveMedia.length > 0 ? (
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {archiveMedia.map((media, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative rounded-2xl overflow-hidden group bg-brand-brown/5"
                      >
                        {media._type === "image" ? (
                          <img
                            src={media.asset?.url}
                            alt={`Archive ${idx}`}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="relative aspect-video">
                            <video
                              className="w-full h-full object-cover"
                              controls
                              playsInline
                            >
                              <source src={media.asset?.url} />
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                              <div className="w-16 h-16 rounded-full bg-brand-orange/90 text-brand-brown flex items-center justify-center shadow-xl">
                                <Play size={32} fill="currentColor" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-brand-brown/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <Sparkles size={48} className="text-brand-orange/40" />
                    <p className="text-brand-brown/40 font-headline text-xl">
                      No additional media in this archive yet.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="cursor-pointer p-6 bg-secondary text-primary-text flex justify-center">
                <button
                  onClick={() => setIsArchiveOpen(false)}
                  className="cursor-pointer   font-headline font-bold uppercase tracking-widest text-xs hover:text-brand-orange transition-colors"
                >
                  Back to Portfolio
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
