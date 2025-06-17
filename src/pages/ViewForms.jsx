import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { getAllFormData, getUserForms, deleteFormByIndex } from "../services/storageService";
import { useNavigate } from "react-router-dom";

const ViewForms = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) return navigate("/login");
    if (currentUser.user_type === "admin") {
      setForms(getAllFormData());
    } else {
      setForms(getUserForms(currentUser.email));
    }
  }, []);

  const handleDelete = (index) => {
    if (currentUser.user_type === "admin") {
      deleteFormByIndex(index);
      setForms(getAllFormData());
    } else {
      deleteFormByGlobalIndex(index); // uses global index
      setForms(getUserForms(currentUser.email));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Submitted Forms</h2>
      {forms.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">State</th>
              <th className="border px-2 py-1">City</th>
              <th className="border px-2 py-1">DOB</th> {/* 👈 added DOB column */}
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{form.name}</td>
                <td className="border px-2 py-1">{form.email}</td>
                <td className="border px-2 py-1">{form.state}</td>
                <td className="border px-2 py-1">{form.city}</td>
                <td className="border px-2 py-1">
                  {form.dob ? form.dob : "N/A"}
                </td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
  );
};

export default ViewForms;
