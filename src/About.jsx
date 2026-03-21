import { useState } from "react";
import { useEffect } from "react";
import client from "./sanity";

const query = `
*[_type == "about"][0]{
  _id,
  title,
  desc,
  aboutImages[]{
    _key,
    asset->{
      url
    }
  },

  introVids[]{
    _key,
    asset->{
      url
    }
  }
}
`;

function About() {
  const [active, setActive] = useState(0);
  const [imgs, setImgs] = useState([]);
  const [scrollImgs, setScrollImgs] = useState([]);
  const [aboutText, setAboutText] = useState("");
  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await client.fetch(query);
        const aboutImageUrls = res.aboutImages.map((img) => img.asset.url);
        const introVidUrls = res.introVids.map((vid) => vid.asset.url);
        setAboutText(res.desc[0].children[0].text);
        setImgs(aboutImageUrls);
        setScrollImgs(introVidUrls);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    }
    fetchdata();
  }, []);

  useEffect(() => {
    if (imgs.length === 0) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % imgs.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [imgs.length]);

  let images = "rounded-[50px] h-1/7";
  return (
    <div className="h-dvh bg-primary py-30 px-[10%] relative" id="about">
      <div className="flex gap-20 h-full">
        <div className="flex flex-col w-3/5 justify-between">
          {/* slideshow */}
          <div className="relative w-full bg-black min-h-125 rounded-[50px] overflow-hidden">
            {imgs.map((src, i) => {
              return (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={`
  absolute inset-0 w-full h-full object-cover object-center
  transition-all duration-1000 ease-in-out
  ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"}
`}
                />
              );
            })}
          </div>
          <div>
            <p className="mt-[10%] text-8xl font-extrabold">ABOUT ME</p>
            <p className="mt-10 text-2xl text-justify">{aboutText}</p>
          </div>
        </div>
        <div className="border-l-4 rounded-4xl"></div>
        {/* videos that keeps scrolling using animation */}
        <div className="flex flex-col justify-between w-1/3 h-full overflow-hidden">
          <div className="scrolling flex flex-col gap-10">
            {scrollImgs.length > 0 ? (
              <>
                {scrollImgs.map((src, i) => (
                  <img key={i} className={images} src={src} alt="scroll" />
                ))}
                {scrollImgs.map((src, i) => (
                  <img
                    key={`duplicate-${i}`}
                    className={images}
                    src={src}
                    alt="scroll"
                  />
                ))}
              </>
            ) : (
              <>
                <img
                  className={images}
                  src="src/assets/hero.jpeg"
                  alt="placeholder"
                />
                <img
                  className={images}
                  src="src/assets/hero.jpeg"
                  alt="placeholder"
                />
                <img
                  className={images}
                  src="src/assets/hero.jpeg"
                  alt="placeholder"
                />
                <img
                  className={images}
                  src="src/assets/hero.jpeg"
                  alt="placeholder"
                />
                <img
                  className={images}
                  src="src/assets/hero.jpeg"
                  alt="placeholder"
                />
                <img
                  className={images}
                  src="src/assets/hero.jpeg"
                  alt="placeholder"
                />
              </>
            )}
          </div>
        </div>
        <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-47%); }
        }
        .scrolling {
          animation: scroll 10s linear infinite;
          will-change: transform;
        }
        .scrolling:hover {
          animation-play-state: paused;
        }
      `}</style>
      </div>
    </div>
  );
}

export default About;
