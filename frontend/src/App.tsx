import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home/Home";
import FanficLibrary from "./pages/user/FanficLibrary/FanficLibrary";
import CreateFanfic from "./pages/user/CreateFanfic/CreateFanfic";
import Profile from "./pages/user/Profile/Profile";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminFanfics from "./pages/admin/AdminFanfics/AdminFanfics";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          {/* для обычного юзера */}
          <Route path="/" element={<UserLayout />}>
            <Route path="" element={<Home />} />
            <Route path="library" element={<FanficLibrary />} />
            <Route path="createfanfic" element={<CreateFanfic />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/*тут роуты для админа */}
          <Route path="admin" element={<AdminLayout />}>
            <Route path="fanfics" element={<AdminFanfics />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
