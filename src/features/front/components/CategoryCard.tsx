import React from 'react'
import styles from "../FrontPage.module.scss"

type CategoryCard = {
    img: string,
    name: string,
}


const CategoryCard: React.FC<CategoryCard> = ({img, name}) => {
  return (
    <div className={styles.card}>
        <img src={img} alt={img} />
        <span>{name}</span>
        <button>Більше</button>
    </div>
  )
}

export default CategoryCard