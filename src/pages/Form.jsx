import React, { useEffect, useState } from "react";
import {
  saveFormData,
  getCurrentUser,
} from "../services/storageService";
import { useNavigate } from "react-router-dom";

const stateCityMap = {
  State1: ["City1", "City2", "City3"],
  State2: ["CityA", "CityB", "CityC"],
};

const Form = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    state: "",
    city: "",
    dob: "",  // 👈 added dob field in state
  });

  useEffect(() => {
    if (!currentUser) return navigate("/login");

    // Set default name/email
    setForm((prev) => ({
      ...prev,
      name: currentUser.name,
      email: currentUser.email,
    }));
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!form.dob) {
      alert("Please select your Date of Birth.");
      return;
    }

    saveFormData(form);
    alert("Form saved!");
    navigate("/dashboard");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">User Form</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          readOnly
          className="w-full p-2 mb-3 border rounded bg-gray-100 cursor-not-allowed"
        />

        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        >
          <option value="">Select State</option>
          {Object.keys(stateCityMap).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        >
          <option value="">Select City</option>
          {form.state &&
            stateCityMap[form.state].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>

        {/* DOB Date Picker */}
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Form
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
