import React, { useEffect, useState } from "react";
import { getCurrentUser, getUserForms } from "../services/storageService";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userForms, setUserForms] = useState([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
      setUserForms(getUserForms(currentUser.email));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">My Form Entries</h2>

          {userForms.length > 0 ? (
            <div className="space-y-4">
              {userForms.map((form, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded shadow-sm"
                >
                  <p><strong>Name:</strong> {form.name}</p>
                  <p><strong>Email:</strong> {form.email}</p>
                  <p><strong>State:</strong> {form.state}</p>
                  <p><strong>City:</strong> {form.city}</p>
                </div>
              ))}
              <Link
                to="/form"
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Fill Another Form
              </Link>
            </div>
          ) : (
            <div className="bg-yellow-100 p-4 rounded">
              <p>You haven't submitted any forms yet.</p>
              <Link
                to="/form"
                className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Fill My Form
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link
            to="/myforms"
            className="text-blue-600 hover:underline"
          >
            🔍 View My Form Data (Table)
          </Link>
        </div>

        {user.userType === "admin" && (
          <div className="mt-6">
            <Link
              to="/admin"
              className="text-red-600 font-medium hover:underline"
            >
              🛠 Go to Admin Panel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
