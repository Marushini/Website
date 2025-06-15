import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import FormPage from '../pages/Form.jsx';
import ViewForms from "../pages/ViewForms";
import AdminPanel from "../pages/AdminPanel";
import AdminPage from "../pages/AdminPage";
import { getCurrentUser } from "../services/authService";

export default function AppRoutes() {
  const user = getCurrentUser();

  return (
    <BrowserRouter>
      <nav className="bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white px-6 py-4 flex space-x-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'underline font-bold' : 'hover:underline'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'underline font-bold' : 'hover:underline'
          }
        >
          About
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? 'underline font-bold' : 'hover:underline'
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? 'underline font-bold' : 'hover:underline'
          }
        >
          Register
        </NavLink>
        {user?.user_type === "admin" && (
          <NavLink
            to="/adminpanel"
            className={({ isActive }) =>
              isActive ? 'underline font-bold' : 'hover:underline'
            }
          >
            Admin Panel
          </NavLink>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/myforms" element={<ViewForms />} />

        {/* Corrected admin routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
