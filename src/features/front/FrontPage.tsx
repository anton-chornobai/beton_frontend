import React, { useState, useEffect } from "react";
import styles from "./FrontPage.module.scss";
import ImageSlider from "./components/ImageSlider";

import CategoryList from "./components/CategoryList";



const FrontPage = () => {
  return (
    <div className={styles.front_page}>
      <ImageSlider/>
      <div className={styles.categories}>
        <CategoryList/>
      </div>
    </div>
  );
};

export default FrontPage;
