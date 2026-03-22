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

  let images =
    "rounded-[50px] aspect-video h-[clamp(200px,20vw, 300px)] shrink-0 w-[clamp(300px,90vw,500px)] xl:w-full object-cover tap-hint";
  return (
    <div
      className="xl:h-dvh text-secondary-text bg-primary py-[min(10%,5rem)] px-[clamp(1rem,10%,5rem)] 2xl:px-40 relative"
      id="about"
    >
      <div className=" xl:flex xl:gap-20 xl:h-full">
        <div
          className="
  grid 
  xl:grid-rows-2 
  gap-10 
  2xl:w-3/5 
  xl:w-1/2
  justify-between
  lg:[@media(max-height:800px)]:gap-0
  lg:[@media(max-height:800px)]:grid-rows-1
"
        >
          {/* slideshow */}
          <div className="[@media(max-height:800px)]:hidden  relative w-full bg-secondary rounded-[50px] overflow-hidden">
            {imgs.map((src, i) => {
              return (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={`
  absolute inset-0 w-full h-full object-cover object-center
  transition-all duration-1000 ease-in-out aspect-4/3 
  ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"}
`}
                />
              );
            })}
          </div>
          <div className="flex flex-col justify-end gap-[8%]">
            <p className="nestTitle text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold">
              ABOUT ME
            </p>
            <p className=" nestText mt-[min(10%,2rem)] 2xl:w-3/4 text-xs sm:text-base md:text-lg lg:text-2xl text-justify">
              {aboutText}
            </p>
          </div>
        </div>
        <div className="mt-10 border-l-4 rounded-4xl"></div>
        <div className="flex border-t-4 py-10 xl:border-0 xl:py-0 xl:mt-0 xl:flex-col xl:justify-between xl:w-1/3 w-full max-h-150 xl:max-h-full  xl:h-full overflow-hidden">
          <div className="scrolling flex xl:flex-col gap-10 h-fit">
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
        @keyframes scrollY {
          0% { transform: translateY(0); }
          100% { transform: translateY(-51%); }
        }

        @keyframes scrollX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-51%); }
        }

        .scrolling {
          animation: scrollY 3s linear infinite;
          will-change: transform;
        }

        .scrolling:hover {
          animation-play-state: paused;
        }

        /* < xl (Tailwind xl = 1280px) */
        @media (max-width: 1279px) {
          .scrolling {
            animation: scrollX 3s linear infinite;
          }
        }

        @media (max-height: 700px) {
        .nestTitle {
        font-size: 2rem;  
        }
        .nestText{
        font-size: 1rem;
        }
      }
      `}</style>
      </div>
    </div>
  );
}

export default About;
