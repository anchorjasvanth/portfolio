import { useState, useEffect } from "react";
import client from "./sanity";

function About() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "about"][0]{
  title,
  desc,
  "aboutImages": aboutImages[]{
    asset->{ url }
  },
  "videos": [
    select(defined(kannda.asset->url) => {
      "url": kannda.asset->url,
      "label": "Kannada"
    }),
    select(defined(hini.asset->url) => {
      "url": hini.asset->url,
      "label": "Hindi"
    }),
    select(defined(english.asset->url) => {
      "url": english.asset->url,
      "label": "English"
    })
  ][defined(@)]
}`;

    async function fetchData() {
      try {
        const res = await client.fetch(query);
        setData(res);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching about data:", e);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!data?.aboutImages || data.aboutImages.length === 0) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % data.aboutImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data?.aboutImages?.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-brown flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
      </div>
    );
  }

  if (!data) return null;

  const imgs = data.aboutImages.map((img) => img.asset?.url);
  const scrollVids = data.videos || [];

  return (
    <section
      className="min-h-screen bg-primary text-secondary-text py-20 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-12 lg:gap-20 overflow-hidden"
      id="about"
    >
      {/* Left Content: Slideshow & Text */}
      <div className="flex-1 flex flex-col gap-12">
        {/* Slideshow */}
        <div className="relative aspect-video lg:aspect-[16/9] w-full bg-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {imgs.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`About slide ${i}`}
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-all duration-1000 ease-in-out
                ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"}
              `}
              referrerPolicy="no-referrer"
            />
          ))}
          <div className="absolute bottom-6 left-6 flex gap-2">
            {imgs.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-brand-orange" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter text-brand-orange">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-secondary-text leading-relaxed font-light max-w-3xl">
            {data.desc[0].children[0].text}
          </p>
        </div>
      </div>

      {/* Right Content: Language Videos */}
      <div className="lg:w-1/3 flex flex-col min-h-[400px] lg:min-h-0">
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex-1 flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-6 overflow-y-auto lg:overflow-visible pr-2 lg:pr-0 max-h-[500px] lg:max-h-none custom-scrollbar">
              {scrollVids.map((video, i) => (
                <div
                  key={i}
                  className="relative shrink-0 w-full aspect-video rounded-2xl overflow-hidden shadow-lg group border border-white/5 hover:border-brand-orange/50 transition-colors"
                >
                  <video
                    className="w-full h-full object-cover"
                    src={video.url}
                    controls
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                  <div className="absolute top-4 left-4 bg-secondary/80 text-primary-text px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10">
                    {video.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.7);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(244, 179, 63, 1);
        }
      `}</style>
    </section>
  );
}

export default About;
