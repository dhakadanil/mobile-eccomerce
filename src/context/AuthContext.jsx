import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // JSON Server ka base URL (Aapka port number alag ho toh badal lena, e.g., 5000 ya 3000)
  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 1. 🚀 Real Registration Function (db.json me data save karega)
  const register = async (name, email, password) => {
    try {
      // Pehle check karo ki kya yeh email pehle se register toh nahi hai
      const checkRes = await fetch(`${BASE_URL}/users?email=${email}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        return { success: false, message: "⚠️ Email already exists!" };
      }

      // Agar new email hai, toh usko db.json me post kar do
      const role = email === "admin@gmail.com" ? "admin" : "user";
      const newUser = { name, email, password, role };

      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        return { success: true };
      }
      return { success: false, message: "Registration failed." };
    } catch (error) {
      return { success: false, message: "Server error!" };
    }
  };

  // 2. 🔐 Real Login Function (db.json se data match karega)
  const login = async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        const loggedInUser = data[0]; // db.json se user mil gaya
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        return { success: true };
      } else {
        return { success: false, message: "⚠️ Invalid Email or Password!" };
      }
    } catch (error) {
      return { success: false, message: "Server error!" };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
