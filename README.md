# ⚛️ React + Tailwind Frontend Boilerplate

A responsive React frontend boilerplate built with **Vite**, **Tailwind CSS**, and **React Router**. Includes a basic page layout and **mock authentication** flow (login/register).

---

## 🧪 Test Login (Mock Auth)

You can log in using the following mock credentials:

- **Email:** maru@gmail.com  
- **Password:** 123456

✅ Successful login redirects to the **Dashboard**.  
❌ Invalid credentials show an error message.  
📝 Registering a new user redirects to the login screen (mock only — no user is saved).

---

## 📄 Pages Included

- 🏠 Home  
- ℹ️ About  
- 🔐 Login  
- 📝 Register  
- 📊 Dashboard (post-login protected area)

---

## 🔒 Mock Authentication Logic

Authentication is handled on the frontend with a simple mock check:

- Hardcoded valid user:
  ```js
  Email: maru@gmail.com  
  Password: 123456

  
| Package                   | Purpose                     |
| ------------------------- | --------------------------- |
| `vite`                    | Fast React dev/build tool   |
| `react`                   | Core frontend framework     |
| `react-router-dom`        | Page navigation & routing   |
| `tailwindcss`             | Utility-first CSS framework |
| `postcss`, `autoprefixer` | Required by Tailwind CSS    |
| `@vitejs/plugin-react`    | React support in Vite       |
