// Constants for localStorage keys
const FORM_DATA_KEY = "formData";
const CURRENT_USER_KEY = "currentUser";

// Save a new form entry for a user (support multiple per user)
export function saveFormData(form) {
  const allData = getAllFormData();
  allData.push(form); // append new form entry
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(allData));
}

// Get all submitted form data (for admin use)
export function getAllFormData() {
  const data = localStorage.getItem(FORM_DATA_KEY);
  return data ? JSON.parse(data) : [];
}

// Get all forms submitted by a specific user
export function getUserForms(email) {
  return getAllFormData().filter((entry) => entry.email === email);
}

// Delete a specific form (for user or admin)
// You must pass the full form object or its index to identify it
export function deleteFormByIndex(globalIndex) {
  const allData = getAllFormData();
  allData.splice(globalIndex, 1);
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(allData));
}

// Set the current logged-in user (on login/register)
export function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Get the currently logged-in user
export function getCurrentUser() {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

// Clear the current user (on logout)
export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
