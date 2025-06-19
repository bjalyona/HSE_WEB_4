import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Button from "../Button/Button";

export default function Header() {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo">
          <span>FanficVerse</span>
        </div>
        <Button onClick={handleAdmin}>Перейти в админку</Button>
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "header-link-active" : "header-link"
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? "header-link-active" : "header-link"
            }
          >
            Библиотека
          </NavLink>
          <NavLink
            to="/createfanfic"
            className={({ isActive }) =>
              isActive ? "header-link-active" : "header-link"
            }
          >
            Создать фанфик
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "header-link-active" : "header-link"
            }
          >
            Профиль
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
