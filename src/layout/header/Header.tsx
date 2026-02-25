import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const openAuth = () => {
      navigate("/profile")
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="left">
          <NavLink to="/" className="logo">
            Beton
          </NavLink>
        </div>

        <nav className="nav">
          <NavLink to="/">{t("products")}</NavLink>

          <NavLink to="/delivery">{t("delivery")}</NavLink>
          <NavLink to="/contact">{t("contact")}</NavLink>
        </nav>

        <div className="personal">
          <button className="profile-button" onClick={openAuth}>
            <FontAwesomeIcon className="profile-pic" icon={faCircleUser} />
          </button>

          <div>
            <button onClick={() => changeLanguage("ua")}>UA</button>
            <button onClick={() => changeLanguage("en")}>EN</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
