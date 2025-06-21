import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import './AdminHeader.css'

export default function Header() {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo">
          <span>FanficVerse</span>
        </div>
        <Button onClick={handleAdmin}>В профиль пользователя</Button>
        <nav className="header-nav">
          <NavLink
            to="/admin/"
            className={({ isActive }) =>
              isActive ? "header-link-active" : "header-link"
            }
          >
            Управление пользователями
          </NavLink>
          <NavLink
            to="/admin/fanfics"
            className={({ isActive }) =>
              isActive ? "header-link-active" : "header-link"
            }
          >
            Управление фанфиками
          </NavLink>
          
        </nav>
      </div>
    </div>
  );
}
