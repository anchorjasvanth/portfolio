import { useEffect, useState } from "react";
//fix lengths and stuff
function Gallery({ data }) {
  const [active, setActive] = useState(0);
  const [transition, setTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return; // don't run interval when paused
    const interval = setInterval(() => {
      setActive((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (active === 4) {
      setTimeout(() => {
        setTransition(false); // disable animation
        setActive(0); // jump back

        // re-enable animation next frame
        requestAnimationFrame(() => {
          setTransition(true);
        });
      }, 700); // match transition duration
    }
  }, [active]);
  let event = (
    <>
      <div className="text-3xl">2030</div>
      <div className="text-3xl font-extrabold">Abyss Of Deceptions</div>
      <div className="mt-7 mb-7 bg-white aspect-video rounded-4xl">
        <img src="" alt="" />
      </div>
      <p className="text-2xl line-clamp-4 text-justify">
        A gripping coastal thriller that masterfully combines the serene charm
        of a coastal setting with an enthralling mystery. A gripping coastal
        thriller that masterfully combines the serene charm of a coastal setting
        with an enthralling mystery. A gripping coastal thriller that
        masterfully combines the serene charm of a coastal setting with an
        enthralling mystery. A gripping coastal thriller that masterfully
        combines the serene charm of a coastal setting with an enthralling
        mystery.
      </p>
    </>
  );

  let eventArray = [event, event, event, event, event, event, event, event];
  let eventSize = eventArray.length;

  return (
    <div
      className="h-dvh bg-black text-white p-30 px-[8%] grid grid-cols-3 grid-rows-[35%_75%] gap-15"
      id="gallery"
    >
      <div className="col-span-2 col-start-2 text-[10rem] self-center justify-self-end font-extrabold">
        {data.title}
      </div>
      <div
        className="col-span-3 row-start-2 overflow-hidden "
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex hover:animation-play-state: paused ${transition ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
          style={{
            transform: `translateX(-${active * (100 / 3)}%)`,
          }}
        >
          {eventArray.map((item, index) => (
            <div key={index} className="w-1/3 px-5 flex-shrink-0 flex flex-col">
              {index % 4}
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
