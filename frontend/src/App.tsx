import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home/Home";
import FanficLibrary from "./pages/user/FanficLibrary/FanficLibrary";
import CreateFanfic from "./pages/user/CreateFanfic/CreateFanfic";
import Profile from "./pages/user/Profile/Profile";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminFanfics from "./pages/admin/AdminFanfics/AdminFanfics";
import Reading from "./components/Reading/Reading";
import LoginPage from "./pages/user/LoginPage/LoginPage";
import RegisterPage from "./pages/user/RegisterPage/RegisterPage";
import AdminUsers from "./pages/admin/AdminUsers/AdminUsers";
function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route path="" element={<Home />} />
            <Route path="library" element={<FanficLibrary />} />
            <Route path="library/:id" element={<Reading />} />
            <Route path="createfanfic" element={<CreateFanfic />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="" element={<AdminUsers />} />
            <Route path="fanfics" element={<AdminFanfics />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
