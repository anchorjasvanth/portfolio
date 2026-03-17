function Navbar() {
  let layout =
    "fixed top-5 left-0 right-0 mx-auto w-98/100 z-50 flex justify-between";
  return (
    <nav
      className={
        " bg-black/50 text-primary-text/90 backdrop-blur px-12 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] text-2xl rounded-4xl " +
        layout
      }
    >
      <div className="text-3xl">JASWANTH</div>
      <ul className="flex gap-20">
        <li>HOME</li>
        <li>ABOUT</li>
        <li>GALLERY</li>
        <li>CONTACT</li>
      </ul>
    </nav>
  );
}

export default Navbar;
