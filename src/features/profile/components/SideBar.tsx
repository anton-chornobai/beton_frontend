import { useNavigate } from "react-router-dom";
import profile from "../Profile.module.scss";

interface SideBarProps {
  userRole: string; // or string if more roles exist
}

export const SideBar = ({ userRole }: SideBarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Профіль", path: "/profile" },
    { label: "Галерея", path: "/gallery" },
    { label: "Налаштування", path: "/settings" },
  ];

  const adminControlItems = [
    { label: "Склад", path: "/inventory" },
    { label: "Замовлення", path: "/orders" },
    { label: "Працівники", path: "/employees" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <ul className={profile.sidebar}>
      {menuItems.map((item) => (
        <li
          key={item.path}
          className={profile.sidebar__item}
          onClick={() => handleNavigation(item.path)}
          style={{ cursor: "pointer" }}
        >
          {item.label}
        </li>
      ))}

      {userRole === "admin" && (
        <>
          <li className={profile.sidebar__sectionTitle}>Менеджмент</li>

          {adminControlItems.map((item) => (
            <li
              key={item.path}
              className={profile.sidebar__item}
              onClick={() => handleNavigation(item.path)}
              style={{ cursor: "pointer" }}
            >
              {item.label}
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
