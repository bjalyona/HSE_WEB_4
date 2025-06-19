
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}


