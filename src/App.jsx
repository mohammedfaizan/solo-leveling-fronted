import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import QuestForm from "./components/QuestForm.jsx";
import QuestHeatmap from "./components/QuestHeatmap.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const MainPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const triggerRefresh = () => setRefresh((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login using React Router
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-blue-900 via-black to-blue-900 p-6">
      <h1 className="text-white text-4xl font-extrabold mb-2 drop-shadow-lg">
        Level Up Every Day! ⚡
      </h1>
      <p className="text-white text-lg mb-8">
        Build your habit streaks with daily quests!
      </p>

      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 text-white bg-red-600 px-4 py-2 rounded-md shadow-md hover:bg-red-500"
      >
        Logout
      </button>

      <div className="w-full flex flex-col items-center space-y-10">
        {!isFormVisible && (
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-blue-700 px-6 py-3 text-lg text-white font-semibold rounded-lg shadow-lg transition-all duration-300 
              hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(0,122,255,0.8)]"
          >
            + Add a New Quest
          </button>
        )}

        {isFormVisible && (
          <QuestForm
            onClose={() => setIsFormVisible(false)}
            triggerRefresh={triggerRefresh}
          />
        )}

        <div className="w-full flex justify-center">
          <QuestHeatmap refresh={refresh} />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Ensures User is Logged In */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
