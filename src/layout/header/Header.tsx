import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <header className="header">
      <div className="header-content">
        <div className="left">
          <NavLink to="/" className="logo">
            Стежка
          </NavLink>
        </div>

        <nav className="nav">
          <NavLink to="/">{t("Головна")}</NavLink>
          <NavLink to="/">{t("Товари")}</NavLink>
          <NavLink to="/delivery">{t("Доставка")}</NavLink>
          <NavLink to="/contact">{t("Контакти")}</NavLink>
          <NavLink to="/orders">{t("Закази")}</NavLink>
          <NavLink to="/auth/signup">{t("Регістрація")}</NavLink>
        </nav>

        <div className="personal">
          <button className="profile-button" onClick={openAuth}>
            <FontAwesomeIcon className="profile-pic" icon={faCircleUser} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
