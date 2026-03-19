import { useState } from "react";
import "./App.css";
import Hero from "./Hero";
import Navbar from "./Navbar";
import About from "./About";
import Gallery from "./Gallery";
import Contact from "./Contact";
import { useEffect } from "react";
import { createClient } from "@sanity/client";

const query = `
*[_type == "post"]{
  _id,
  title,
    
}
`;

const client = createClient({
  projectId: "yi97i9xu",
  dataset: "production",
  useCdn: false, // fast (good for frontend)
  apiVersion: "2026-03-19",
  perspective: "published",
});

function App() {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   async function fetchdata() {
  //     let res;
  //     try {
  //       res = await client.fetch(query);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     console.log(res);
  //   }
  //   fetchdata();
  // }, []);
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
