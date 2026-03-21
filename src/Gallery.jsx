import { useEffect, useState } from "react";
//fix lengths and stuff
function Gallery({ data }) {
  const [active, setActive] = useState(0);
  const [transition, setTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);
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
      <div className="text-2xl">2030</div>
      <div className="text-2xl font-extrabold">Abyss Of Deceptions</div>
      <div className="mt-7 mb-7 bg-white aspect-video rounded-4xl">
        <img src="src/assets/theatre.jpeg" alt="" />
      </div>
      <p className="text-2xl line-clamp-3 text-justify">
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
  let widthCalc = "(84%)*1/3";
  let eventMedia = ["", "", "", ""];
  return (
    <div
      className="h-dvh relative bg-black text-white p-30 px-[8%] grid grid-cols-3 grid-rows-[35%_75%] gap-15"
      id="gallery"
    >
      {isPaused && (
        <>
          <div className="top-0 absolute w-full bg-black/50 h-dvh text-white z-2 backdrop-blur-xs"></div>
          <div
            className="top-0 h-dvh w-[calc((84%)/3)] absolute bg-black/0 z-20 flex flex-col p-5 gap-5 overflow-hidden"
            style={{
              left: `calc(8% + ${widthCalc}*${hoverIndex - active})`,
            }}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="scroll-track flex flex-col gap-5">
              {[...eventMedia, ...eventMedia].map((item, index) => (
                <img
                  key={index}
                  className="hbg-white min-h-75 text-black w-full rounded-4xl"
                  src="src/assets/hero.jpeg"
                  alt=""
                />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="col-span-2 col-start-2 text-[10rem] self-center justify-self-end font-extrabold">
        {data.title}
      </div>
      <div className="max-h-fit col-span-3 row-start-2 overflow-hidden ">
        <div
          className={`flex hover:animation-play-state: paused ${transition ? "transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
          style={{
            transform: `translateX(-${active * (100 / 3)}%)`,
          }}
        >
          {eventArray.map((item, index) => (
            <div
              key={index}
              className="relative w-1/3 px-5 flex-shrink-0 flex flex-col"
              onMouseEnter={() => {
                setIsPaused(true);
                setHoverIndex(index); //TODO: add these to image
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
