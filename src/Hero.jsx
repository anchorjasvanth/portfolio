function Hero() {
  return (
    <header
      className="h-dvh relative bg-[url('src/assets/hero.jpeg')] bg-cover bg-left shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.5)] flex items-center justify-end"
      id="home"
    >
      <div className="flex flex-col justify-center mr-50 mb-50">
        <p className="mb-5 text-3xl text-white">COMMANDING THE SPOTLIGHT</p>
        <p className="text-9xl font-extrabold text-white">JASVANTH V A</p>
        <p className="text-8xl text-white">Anchor</p>
        <button className="rounded-4xl shadow-primary shadow-xl/30 p-5 mt-20 text-black bg-primary text-3xl font-extrabold cursor-pointer border-white border-2">
          BRING ME ON STAGE
        </button>
      </div>
    </header>
  );
}

export default Hero;
