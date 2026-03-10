import React from "react";
import Card from "./CategoryCard";
import styles from "../FrontPage.module.scss";
import vase from "../../../images/vases.jpeg"

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

const CategoryList = () => {
  return (
    <div className={styles.cardContainer}>
      {list.map((card: CategoryCardType, index) => (
        <Card key={index} img={card.img} name={card.name} />
      ))}
    </div>
  );
};

export default CategoryList;
