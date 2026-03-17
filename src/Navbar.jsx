function Navbar() {
  let layout =
    "fixed top-5 left-0 right-0 mx-auto w-98/100 z-50 flex justify-between";
  let buttonStyle = "cursor-pointer";
  return (
    <nav
      className={
        " bg-black/50 text-primary-text/90 backdrop-blur px-12 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] text-2xl rounded-4xl " +
        layout
      }
    >
      <div className="text-3xl font-extrabold">JASVANTH</div>
      <ul className="flex gap-20">
        <button className={buttonStyle}>
          <a href="#home">HOME</a>
        </button>
        <button className={buttonStyle}>
          <a href="#about">ABOUT</a>
        </button>
        <button className={buttonStyle}>
          <a href="#gallery">GALLERY</a>
        </button>
        <button className={buttonStyle}>
          <a href="#contact">CONTACT</a>
        </button>
      </ul>
    </nav>
  );
}

export default Navbar;
