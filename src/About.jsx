function About() {
  let images = "rounded-[50px] h-2/7";
  return (
    <div className="h-dvh bg-primary p-30 px-50" id="about">
      <div className="flex gap-20 h-full">
        <div className="flex flex-col w-3/5 justify-between">
          {/* slideshow */}
          <img
            className="rounded-[50px] h-125 object-cover object-center"
            src="src/assets/hero.jpeg"
            alt=""
          />
          <div>
            <p className="mt-30 text-8xl font-bold">ABOUT ME</p>
            <p className="mt-10 text-2xl w-1/2 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nesciunt, ut beatae quod molestias nam consectetur quasi natus
              ipsa, eaque rerum optio. Iste ipsum molestias eius, inventore
              officia quasi nihil nostrum! Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Quibusdam totam eaque voluptatum
              voluptas architecto minima sequi aliquam placeat fugit, laboriosam
              saepe quod nam cum. Ullam alias praesentium distinctio deleniti
              quas?
            </p>
          </div>
        </div>
        <div className="border-l-4 rounded-4xl"></div>
        {/* videos that keeps scrolling using animation */}
        <div className="flex flex-col justify-between  h-full">
          <img className={images} src="src/assets/hero.jpeg" alt="" />
          <img className={images} src="src/assets/hero.jpeg" alt="" />
          <img className={images} src="src/assets/hero.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
