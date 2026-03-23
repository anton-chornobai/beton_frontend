import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./_header.module.scss"; // <-- use modules

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const openAuth = () => {
    navigate("/profile");
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logo}>
            Стежка
          </NavLink>
        </div>

        <nav className={styles.nav}>
          <NavLink to="/">{t("Головна")}</NavLink>
          <NavLink to="/products">{t("Товари")}</NavLink>
          <NavLink to="/delivery">{t("Доставка")}</NavLink>
          <NavLink to="/contact">{t("Контакти")}</NavLink>
        </nav>

        <div className={styles.personal}>
          <button className={styles.profileButton} onClick={openAuth}>
            <FontAwesomeIcon
              className={styles.profilePic}
              icon={faCircleUser}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;