import React, { useState } from "react";
import loginUserAPI from "../components/api/loginUserAPI.js";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUserAPI(userData);
      console.log("User Logged In:", response);
      localStorage.setItem("token", response.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-900 via-black to-blue-900">
      <div className="bg-blue-500/10 p-8 rounded-lg shadow-lg backdrop-blur-md border border-white/30 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
        {error && <p className="text-red-400">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 bg-blue-700/30 text-white placeholder-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 bg-blue-700/30 text-white placeholder-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-700 text-white shadow-[0_0_10px_rgba(0,122,255,0.6)] transition-all hover:shadow-[0_0_20px_rgba(0,122,255,1)]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-white">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
