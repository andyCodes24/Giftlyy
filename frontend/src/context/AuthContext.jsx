// src/context/AuthContext.jsx
//
// Holds the logged-in user + JWT, persisted to localStorage so a page
// refresh doesn't log the user out. Wraps the /auth/login and
// /auth/register endpoints so Login.jsx and Register.jsx stay thin.

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("giftly_auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.user;
      } catch {
        localStorage.removeItem("giftly_auth");
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem("giftly_auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.token;
      } catch {
        localStorage.removeItem("giftly_auth");
      }
    }
    return null;
  });

  const [ready] = useState(true);

  const persist = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem("giftly_auth", JSON.stringify({ user: nextUser, token: nextToken }));
  };

  const login = async (username, password) => {
    const data = await api.post("/auth/login", { username, password });
    persist(data.user, data.token);
    return data;
  };

  const register = async (username, email, password) => {
    const data = await api.post("/auth/register", { username, email, password });
    persist(data.user, data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("giftly_auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, ready, login, register, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}