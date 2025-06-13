// src/services/authService.js

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

// Get users from localStorage
export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

// Save user list to localStorage
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Register a new user
export function registerUser(user) {
  const users = getUsers();
  const existing = users.find((u) => u.email === user.email);
  if (existing) {
    throw new Error("User already exists");
  }

  // Make sure user_type is saved correctly
  const userToSave = {
    name: user.name,
    email: user.email,
    password: user.password,
    userType: user.userType || "user", // default to "user" if not provided
  };

  users.push(userToSave);
  saveUsers(users);
}

// Authenticate login
export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Get currently logged-in user
export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Logout current user
export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
