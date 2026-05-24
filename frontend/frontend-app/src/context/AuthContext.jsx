import React, { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await axios.get("/api/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to load profile", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider