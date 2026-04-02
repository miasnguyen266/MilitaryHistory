// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 chạy 1 lần khi app load (fix F5)
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");

    setToken(storedToken); // null hoặc token đều OK
    setLoading(false);
  }, []);

  // 🔥 login đúng
  const login = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
  };

  // 🔥 logout chuẩn
  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  // 🔥 derive state (không cần set riêng)
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
