function Gallery({ data }) {
  let event = (
    <div className=" row-span-1 row-start-2  flex flex-col">
      <div className="text-3xl">2030</div>
      <div className="text-3xl font-extrabold">Abyss Of Deceptions</div>
      <div className="mt-7 mb-7 bg-white aspect-video rounded-4xl">
        <img src="" alt="" />
      </div>
      <p className="text-2xl line-clamp-4">
        A gripping coastal thriller that masterfully combines the serene charm
        of a coastal setting with an enthralling mystery. A gripping coastal
        thriller that masterfully combines the serene charm of a coastal setting
        with an enthralling mystery. A gripping coastal thriller that
        masterfully combines the serene charm of a coastal setting with an
        enthralling mystery. A gripping coastal thriller that masterfully
        combines the serene charm of a coastal setting with an enthralling
        mystery.
      </p>
    </div>
  );

  return (
    <div
      className="h-dvh bg-black text-white p-30 px-[8%] grid grid-cols-3 grid-rows-[40%_60%] gap-15"
      id="gallery"
    >
      <div className="col-span-2 col-start-2 text-[10rem] self-center justify-self-end font-extrabold">
        {data.title}
      </div>
      {event}
      {event}
      {event}
    </div>
  );
}

export default Gallery;
