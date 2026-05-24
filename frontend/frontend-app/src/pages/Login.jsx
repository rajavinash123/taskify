import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import {toast} from "react-toastify"
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);

      const profileRes = await axios.get("/api/auth/profile");
      setUser(profileRes.data.user);

      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Login Form
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            onClick={Login}
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white transition duration-200 hover:bg-indigo-500"
          >
            Login
          </button>


          {/* Signup Link */}
          <p className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 text-indigo-400 hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;