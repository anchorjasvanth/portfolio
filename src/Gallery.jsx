import { useEffect, useState } from "react";
import client from "./sanity";
const query = `

`;

function Gallery({ data }) {
  const [active, setActive] = useState(0);
  const [transition, setTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [eventMediaArray, setEventMediaArray] = useState([]);

  useEffect(() => {
    const typeMap = {
      FORMAL: "formal",
      "HIGH CROWD": "crowd",
      CLASSICAL: "classical",
    };
    const type = typeMap[data.title];
    if (!type) return;

    const query = `
*[_type == "${type}"]{
  _id,
  eventName,
  year,
  previewImage{
    asset->{
      url
    }
  },
  eventMedia[]{
    _type,
    asset->{
      url
    }
  },
  description
}
    `;

    async function fetchData() {
      try {
        const res = await client.fetch(query);
        setEvents(res);
        setEventMediaArray(
          res.map((event) => {
            return event.eventMedia || [];
          }),
        );
      } catch (e) {
        console.error("Error fetching gallery data:", e);
      }
    }
    fetchData();
  }, [data.title]);

  useEffect(() => {
    if (isPaused) return; // don't run interval when paused
    const interval = setInterval(() => {
      setActive((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (active === events.length) {
      setTimeout(() => {
        setTransition(false); // disable animation
        setActive(0); // jump back

        // re-enable animation next frame
        requestAnimationFrame(() => {
          setTransition(true);
        });
      }, 700); // match transition duration
    }
  }, [active, events.length]);
  const eventArray = events.map((eventData, index) => (
    <>
      <div key={index} className="text-base xl:text-2xl">
        {eventData.year}
      </div>
      <div className="text-base xl:text-2xl font-extrabold">
        {eventData.eventName}
      </div>
      <p className="2xl:hidden text-primary-text/60 text-xs ">
        Tap images to explore
      </p>
      <img
        className="max-h-60 object-cover mt-7 mb-7 aspect-video rounded-4xl tap-hint"
        src={eventData.previewImage?.asset?.url || "src/assets/theatre.jpeg"}
        alt=""
      />
      <p className="text-xs md:text-base xl:text-xl mb-20 line-clamp-3 text-justify">
        {eventData.description?.[0]?.children?.[0]?.text || "Description"}
      </p>
    </>
  ));

  let eventSize = eventArray.length;
  let eventMedia = eventMediaArray;
  const mediaList = eventMedia[hoverIndex] || [];
  return (
    <div
      className="min-h-dvh relative bg-secondary text-primary-text py-30 px-[8%] grid grid-cols-3 grid-rows-[35%_75%] gap-0 xl:gap-30"
      id="gallery"
    >
      {isPaused && (
        <>
          <div className="top-0 absolute w-full bg-secondary/50 h-dvh text-primary-text z-2 backdrop-blur-xs"></div>

          <div
            className="top-0 h-dvh w-[calc((84%))] lg:w-[calc((84%)/2)] xl:w-[calc((84%)/3)] absolute bg-secondary/0 z-20 flex flex-col p-5 gap-5 overflow-hidden"
            style={{
              left: `calc(8% + (84%)*1/var(--cols) *${hoverIndex - active})`,
            }}
            onMouseLeave={() => setIsPaused(false)}
            onClick={() => setIsPaused(false)}
          >
            {/* scroll-track */}
            <div className="overflow-y-scroll  flex flex-col gap-5 rounded-4xl">
              {[...mediaList, ...mediaList].map((media, index) =>
                media._type === "image" ? (
                  <img
                    key={index}
                    className="bg-secondary object-cover min-h-50 w-full rounded-4xl"
                    src={media.asset?.url}
                    alt="Event media"
                  />
                ) : (
                  <video
                    key={index}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => e.stopPropagation()}
                    preload="metadata"
                    className="bg-secondary object-cover min-h-50 xl:min-h-75 w-full rounded-4xl"
                    controls
                    autoPlay
                    muted
                    playsInline
                    loop
                    style={{ maxHeight: "200px" }}
                  >
                    <source src={media.asset?.url} />
                    Your browser does not support the video tag.
                  </video>
                ),
              )}
            </div>
          </div>
        </>
      )}

      <div className="text-nowrap col-span-2 col-start-2 text-5xl md:text-7xl xl:text-[10rem] self-center justify-self-end font-extrabold">
        {data.title}
      </div>
      <div className="max-h-fit col-span-3 row-start-2 overflow-hidden ">
        <div
          className={`flex hover:[animation-play-state:paused] ${transition ? "transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
          style={{
            transform: `translateX(calc(-${active} * (100% / var(--cols))))`,
          }}
        >
          {[...eventArray, ...eventArray].map((item, index) => (
            <div
              key={index}
              className="relative min-w-1/1 lg:min-w-1/2 w-1/3 xl:min-w-1/3 px-[2.5%] flex-shrink-0 flex flex-col"
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
