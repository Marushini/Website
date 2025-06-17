import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllFormData,
  deleteFormByIndex,
  getCurrentUser,
} from "../services/storageService";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.userType !== "admin") {
      navigate("/login");
    } else {
      setUser(currentUser);
      setAllForms(getAllFormData());
    }
  }, [navigate]);

  const handleDelete = (originalIndex) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteFormByIndex(originalIndex);
      setAllForms(getAllFormData());
    }
  };

  const handleEdit = (originalIndex) => {
    const formToEdit = allForms[originalIndex];
    const updatedName = prompt("Enter new name:", formToEdit.name);
    const updatedState = prompt("Enter new state:", formToEdit.state);
    const updatedCity = prompt("Enter new city:", formToEdit.city);
    const updatedDob = prompt(
      "Enter new Date of Birth (YYYY-MM-DD):",
      formToEdit.dob
    );

    if (updatedName && updatedState && updatedCity && updatedDob) {
      const updatedForms = [...allForms];
      updatedForms[originalIndex] = {
        ...formToEdit,
        name: updatedName,
        state: updatedState,
        city: updatedCity,
        dob: updatedDob,
      };
      localStorage.setItem("formData", JSON.stringify(updatedForms));
      setAllForms(updatedForms);
    }
  };

  // Filter + Search + Sort Logic
  const filteredForms = allForms
    .filter((form) =>
      form.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((form) =>
      stateFilter === "all" ? true : form.state === stateFilter
    )
    .sort((a, b) => {
      if (sortField === "dob") {
        const dateA = new Date(a.dob);
        const dateB = new Date(b.dob);
        if (dateA < dateB) return sortOrder === "asc" ? -1 : 1;
        if (dateA > dateB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      } else {
        const valA = a[sortField]?.toLowerCase?.() ?? "";
        const valB = b[sortField]?.toLowerCase?.() ?? "";
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }
    });

  const uniqueStates = [...new Set(allForms.map((form) => form.state))].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Panel - All Form Entries</h1>

        {/* Search, Filter, Sort Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name/email"
            className="border rounded p-2 flex-grow"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border rounded p-2"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            <option value="all">All States</option>
            {uniqueStates.map((state, idx) => (
              <option key={idx} value={state}>{state}</option>
            ))}
          </select>
          <select
            className="border rounded p-2"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="state">Sort by State</option>
            <option value="dob">Sort by DOB</option>
          </select>
          <select
            className="border rounded p-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        {/* Form List */}
        {filteredForms.length > 0 ? (
          <div className="space-y-4">
            {filteredForms.map((form, index) => {
              const originalIndex = allForms.findIndex(
                (f) =>
                  f.name === form.name &&
                  f.email === form.email &&
                  f.state === form.state &&
                  f.city === form.city &&
                  f.dob === form.dob
              );

              return (
                <div
                  key={originalIndex}
                  className="bg-gray-100 p-4 rounded shadow-sm flex justify-between items-start"
                >
                  <div>
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>State:</strong> {form.state}</p>
                    <p><strong>City:</strong> {form.city}</p>
                    <p><strong>Date of Birth:</strong> {form.dob || "N/A"}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(originalIndex)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(originalIndex)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">No matching form submissions found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
