import React, { useEffect, useState } from "react";
import { getAllFormData, deleteFormByIndex } from "../services/storageService";
import { getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortField, setSortField] = useState("name");

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.user_type !== "admin") {
      navigate("/login");
    } else {
      setForms(getAllFormData());
    }
  }, [navigate]);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      deleteFormByIndex(index);
      setForms(getAllFormData()); // Refresh list
    }
  };

  const handleEdit = (index) => {
    alert("Edit functionality can be implemented here. You selected form #" + index);
  };

  const filteredForms = forms
    .filter((form) => {
      const search = searchTerm.toLowerCase();
      return (
        form.name.toLowerCase().includes(search) ||
        form.email.toLowerCase().includes(search)
      );
    })
    .filter((form) => roleFilter === "all" || form.user_type === roleFilter)
    .sort((a, b) => {
      const fieldA = a[sortField]?.toLowerCase?.() || "";
      const fieldB = b[sortField]?.toLowerCase?.() || "";
      return fieldA.localeCompare(fieldB);
    });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm w-64"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
          </select>
        </div>

        {/* Table Section */}
        {filteredForms.length === 0 ? (
          <p className="text-gray-600 text-center">No matching form submissions found.</p>
        ) : (
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">State</th>
                <th className="p-3 border">City</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredForms.map((form, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{form.name}</td>
                  <td className="p-2 border">{form.email}</td>
                  <td className="p-2 border">{form.state}</td>
                  <td className="p-2 border">{form.city}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
