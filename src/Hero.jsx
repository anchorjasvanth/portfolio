function Hero() {
  return (
    <header
      className="h-dvh relative bg-[url('src/assets/hero.jpeg')] bg-cover bg-[position:20%_0%] xl:bg-left shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.5)] flex items-center justify-end"
      id="home"
    >
      <div className="flex flex-col justify-center mx-auto lg:mr-[10%] mb-50 2xl:my-50">
        <p className="mb-[1%] text-1xl xl:text-2xl 2xl:text-3xl text-white">
          COMMANDING THE SPOTLIGHT
        </p>
        <p className="text-5xl xl:text-6xl  2xl:text-9xl font-extrabold text-white">
          JASVANTH V A
        </p>
        <p className="text-4xl xl:text-5xl 2xl:text-8xl text-white">Anchor</p>
        <button className="rounded-4xl  shadow-primary shadow-xl/30 p-5 mt-[10%] text-black bg-primary text-1xl xl:text-2xl 2xl:text-3xl font-extrabold cursor-pointer border-white border-2">
          BRING ME ON STAGE
        </button>
      </div>
    </header>
  );
}

export default Hero;
