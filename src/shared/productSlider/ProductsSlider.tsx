import React, { useEffect, useState } from "react";
import styles from "./ProductSlider.module.scss";

type Slide = {
  img: string;
  name: string;
};

type Props = {
  slides: Slide[];
};

const ProductSlider: React.FC<Props> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className={styles.productSlider}>
      <button
        className={`${styles.sliderBtn} ${styles.left}`}
        onClick={prev}
      >
        ‹
      </button>

      <div className={styles.sliderWrapper}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slideCard} ${
              index === current ? styles.active : ""
            }`}
          >
            <img src={slide.img} alt={slide.name} />
            <div className={styles.slideInfo}>
              <h4>{slide.name}</h4>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${styles.sliderBtn} ${styles.right}`}
        onClick={next}
      >
        ›
      </button>
    </div>
  );
};

export default ProductSlider;