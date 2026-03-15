import React, { useState, useEffect } from "react";
import styles from "./FrontPage.module.scss";
import ImageSlider from "./components/ImageSlider";

import CategoryList from "./components/CategoryList";
import ProductSlider from "../../shared/productSlider/ProductsSlider";
import vase from "../../images/vases.jpeg";
import Button from "../../shared/Buttons/Button";

type CategoryCardType = {
  img: string;
  name: string;
};

const list: CategoryCardType[] = [
  { img: vase, name: "Фонтани" },
  { img: vase, name: "Вази" },
  { img: vase, name: "Фігурки" },
  { img: vase, name: "Плитка" },
];

const FrontPage = () => {
  return (
    <div className={styles.front_page}>
      <ImageSlider />

      <h2>Категорії</h2>
      <div className={styles.categories}>
        <CategoryList />
      </div>
      <h2>Популярні</h2>
      <div style={{ marginTop: "1.8rem" }}>
        <ProductSlider slides={list} />
      </div>

      <div >
        <div className={styles.description}>
          <h2>Про Нас</h2>
          <p className={styles.pharagraph }>
            Вітаємо у Beton! Ми пропонуємо унікальні декоративні предмети для
            дому та саду – від витончених ваз і фонтанів до стильних фігурок і
            плитки. Кожен виріб обрано з любов’ю, щоб допомогти вам створити
            затишний та стильний простір.
          </p>
          <p>
            Наші клієнти цінують високу якість, швидку доставку та уважне
            обслуговування. Долучайтесь до сотень задоволених покупців та
            оновіть свій простір вже сьогодні!
          </p>
          <Button title={"Дивитись Товари"}/>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
