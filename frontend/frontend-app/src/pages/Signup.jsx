import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("api/auth/signup", formData);

      console.log(res.data);

      alert("Signup Successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Signup Form
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-indigo-500"
              required
            />
          </div>

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
              placeholder="Enter password"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-indigo-500"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white transition duration-200 hover:bg-indigo-500"
          >
            Signup
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-indigo-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;