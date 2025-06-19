import { NavLink, Outlet } from "react-router-dom";


export default function AdminLayout() {
  return (
    <>
    {/* это шапка, тут еще надо её настроить, добавить переход на странички которые нужно( 
    можно сделать компонент как у меня сделан Header, ток назвать типа AdminHeader) */}
      <nav>
        <NavLink to="/">Назад </NavLink>
        <NavLink to="/admin/fanfics">Управление фанфиками</NavLink>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

