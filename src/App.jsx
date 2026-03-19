import { useState } from "react";
import "./App.css";
import Hero from "./Hero";
import Navbar from "./Navbar";
import About from "./About";
import Gallery from "./Gallery";
import Contact from "./Contact";
import { useEffect } from "react";

function App() {
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
