import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Dashboard from '../pages/Dashboard.jsx';
import FormPage from '../pages/Form.jsx';
import ViewForms from "../pages/ViewForms";
import AdminPanel from "../pages/AdminPanel";
import AdminPage from "../pages/AdminPage";
export default function AppRoutes() {

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
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
         <Route path="/dashboard" element={<Dashboard />} />,
         <Route path="/admin" element={<AdminPanel />} />
         <Route path="/myforms" element={<ViewForms />} />
         <Route path="/form" element={<FormPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
