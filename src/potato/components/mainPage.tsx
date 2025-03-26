"use client";
import React, { useState } from "react";

const Home = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const handleScroll = (deltaY: number) => {
    if (deltaY > 0 && currentSection < 2) {
      setCurrentSection((prev) => prev + 1);
    } else if (deltaY < 0 && currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  return (
    <div onWheel={(e) => handleScroll(e.deltaY)} style={{ height: "100vh", overflow: "hidden" }}>
      <div style={{ transform: `translateY(-${currentSection * 100}vh)`, transition: "transform 0.5s ease" }}></div>
    </div>
  );
};

export default Home;
