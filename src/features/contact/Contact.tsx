import React from "react";
import styles from "./ContactPage.module.scss";

const ContactPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <h2>Зв’яжіться з нами</h2>

        <p>
          Залиште свої контактні дані та повідомлення. Ми відповімо якнайшвидше.
        </p>

        <div className={styles.block}>
          <h3>Графік роботи</h3>
          <p>Пн - Пт: 09:00 - 18:00</p>
          <p>Сб: 10:00 - 15:00</p>
          <p>Нд: Вихідний</p>
        </div>

        <div className={styles.block}>
          <h3>Соціальні мережі</h3>
          <div className={styles.socials}>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Telegram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <form className={styles.form}>
          <label>
            Ім’я
            <input type="text" placeholder="Ваше ім’я" />
          </label>

          <label>
            Email
            <input type="email" placeholder="Ваш email" />
          </label>

          <label>
            Телефон (необов’язково)
            <input type="text" placeholder="Ваш номер телефону" />
          </label>

          <label>
            Повідомлення
            <textarea placeholder="Ваше повідомлення..." />
          </label>

          <button type="button">Надіслати</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;