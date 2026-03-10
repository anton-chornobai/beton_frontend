import React, { useEffect, useState } from 'react'
import pathway from "../../../images/pathway.png";
import animals from "../../../images/animals.jpg";
import vases from "../../../images/vases.jpeg";

type Slide = {
    image: string;
    text: string;
    short_description: string;
  };
  
  const slides: Slide[] = [
    { image: pathway, text: "Image 1", short_description: "Description 1" },
    { image: animals, text: "Image 2", short_description: "Description 2" },
    { image: vases, text: "Image 3", short_description: "Description 3" },
  ]

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);
  
    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () =>
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  
  return (
    <div className="image-slider">
        {slides.map((img, index) => (
          <img
            key={index}
            src={img.image}
            alt={`Slide ${index + 1}`}
            className={`slide ${index === current ? "active" : ""}`}
          />
        ))}

        <button className="slider-btn left" onClick={prev}>
          ‹
        </button>
        <button className="slider-btn right" onClick={next}>
          ›
        </button>
      </div>
  )
}

export default ImageSlider