import { useState } from "react";
import { useEffect } from "react";
import client from "./sanity";

const query = `
*[_type == "hero"][0]{
  _id,
  tagline,
  Name,
  Job,
  backgroundImage{
    asset->{
      _id,
      url
    }
  }
}
`;

function Hero() {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await client.fetch(query);
        setHeroData(res);
      } catch (e) {
        console.error("Error fetching Hero data:", e);
      }
    }
    fetchdata();
  }, []);

  if (!heroData) {
    return <div>Loading...</div>; // Or some loading state
  }

  return (
    <header
      className="min-h-dvh relative bg-cover bg-[position:20%_0%] xl:bg-left shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.5)] flex items-center justify-end"
      style={{
        backgroundImage: `url(${heroData.backgroundImage?.asset?.url || "src/assets/hero.jpeg"})`,
      }}
      id="home"
    >
      <div className="flex flex-col justify-center mx-auto lg:mr-[10%] mb-50 my-60 lg:my-50">
        <p className="lg:mt-0 mt-50 mb-[1%] text-1xl xl:text-2xl 2xl:text-3xl text-primary-text">
          {heroData.tagline}
        </p>
        <p className="text-5xl md:text-7xl font-extrabold text-primary-text">
          {heroData.Name}
        </p>
        <p className="text-4xl xl:text-5xl  text-primary-text">
          {heroData.Job}
        </p>
        <button
          onClick={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-4xl p-5 mt-[10%] text-secondary-text bg-primary text-1xl xl:text-2xl font-extrabold cursor-pointer border-primary-text border-2"
        >
          BRING ME ON STAGE
        </button>
      </div>
    </header>
  );
}

export default Hero;
