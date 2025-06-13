import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllFormData,
  deleteFormByIndex,
  getCurrentUser,
  setCurrentUser,
} from "../services/storageService";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.userType !== "admin") {
      navigate("/login");
    } else {
      setUser(currentUser);
      setAllForms(getAllFormData());
    }
  }, [navigate]);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteFormByIndex(index);
      setAllForms(getAllFormData());
    }
  };

  const handleEdit = (index) => {
    const formToEdit = allForms[index];
    const updatedName = prompt("Enter new name:", formToEdit.name);
    const updatedState = prompt("Enter new state:", formToEdit.state);
    const updatedCity = prompt("Enter new city:", formToEdit.city);

    if (updatedName && updatedState && updatedCity) {
      const updatedForms = [...allForms];
      updatedForms[index] = {
        ...formToEdit,
        name: updatedName,
        state: updatedState,
        city: updatedCity,
      };
      localStorage.setItem("formData", JSON.stringify(updatedForms));
      setAllForms(updatedForms);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Panel - All Form Entries</h1>

        {allForms.length > 0 ? (
          <div className="space-y-4">
            {allForms.map((form, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded shadow-sm flex justify-between items-start"
              >
                <div>
                  <p><strong>Name:</strong> {form.name}</p>
                  <p><strong>Email:</strong> {form.email}</p>
                  <p><strong>State:</strong> {form.state}</p>
                  <p><strong>City:</strong> {form.city}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No form submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;