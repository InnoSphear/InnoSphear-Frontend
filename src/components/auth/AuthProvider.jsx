import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import api from "../../api/client";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("innosphear_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token, user: userData } = response.data.data;
    localStorage.setItem("innosphear_token", token);
    localStorage.setItem("innosphear_user", JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("innosphear_token");
    localStorage.removeItem("innosphear_user");
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

export default AuthProvider;







