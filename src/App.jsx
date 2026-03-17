import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hero from "./Hero";
import Navbar from "./Navbar";
import About from "./About";
import Gallery from "./Gallery";
import Contact from "./Contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <About></About>
        <Gallery></Gallery>
        <Gallery></Gallery>
        <Gallery></Gallery>
        <Contact></Contact>
      </div>
    </>
  );
}

export default App;
