import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader/AdminHeader";


export default function AdminLayout() {
  return (
    <>
      <AdminHeader/>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

