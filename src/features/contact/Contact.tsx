import React, { useState } from "react";
import styles from "./ContactPage.module.scss";

import {
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaLinkedin,
} from "react-icons/fa";
import { UserContactPostRequest } from "./types/contact";
import { postContact } from "./api/contact";
import useFormValidation from "./hooks/useFormValidation";
import FormError from "../../shared/errors/FormError";

const ContactPage: React.FC = () => {
  const { errors, validate } = useFormValidation();
  const [contactForm, setContactForm] = useState<UserContactPostRequest>({
    name: "",
    number: "",
    message: "",
  });

  const onChange = (key: keyof UserContactPostRequest, value: string) => {
    setContactForm((prevContact) => ({
      ...prevContact,
      [key]: value,
    }));
  };

  const onEmailChange = (value: string) => {
    setContactForm((prev) => {
      if (!value.trim()) {
        const { email, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        email: value,
      };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(errors);

    const isValid = validate(contactForm);
    if (!isValid) return;

    try {
      const res = await postContact("/contacts", contactForm);

      if (!res.ok) {
        throw new Error(res.message || "Щось пішло не так...");
      }

      const data = await res.json();
      console.log("Message:" + data.message || "none");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2>Зв’яжіться з нами</h2>

          <p>
            Залиште свої контактні дані та повідомлення. Ми відповімо
            якнайшвидше.
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
              <a className={styles.instagram} href="#">
                <FaInstagram />
                <span>Instagram</span>
              </a>

              <a className={styles.facebook} href="#">
                <FaFacebook />
                <span>Facebook</span>
              </a>

              <a className={styles.telegram} href="#">
                <FaTelegram />
                <span>Telegram</span>
              </a>

              <a className={styles.linkedin} href="#">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={onSubmit}>
            <label>
              Ім’я
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="Ваше ім’я"
              />
              {errors.name && <FormError message={errors.name} />}
            </label>

            <label>
              Email (необов’язково)
              <input
                type="email"
                value={contactForm.email || ""}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="Ваш email"
              />
              {errors.email && <FormError message={errors.email} />}
            </label>

            <label>
              Телефон
              <input
                value={contactForm.number || ""}
                onChange={(e) => onChange("number", e.target.value)}
                type="text"
                placeholder="Ваш номер телефону"
              />
              {errors.number && <FormError message={errors.number} />}
            </label>

            <label>
              Повідомлення
              <textarea
                value={contactForm.message}
                onChange={(e) => onChange("message", e.target.value)}
                placeholder="Ваше повідомлення..."
              />
              {errors.message && <FormError message={errors.message} />}
            </label>

            <button type="submit">Надіслати</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
