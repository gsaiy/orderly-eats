import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "customer" | "restaurant" | "delivery" | "instamart" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<string, User & { password: string }> = {
  "customer@swigato.com": { id: "u1", name: "Rahul Sharma", email: "customer@swigato.com", phone: "9876543210", role: "customer", password: "password" },
  "restaurant@swigato.com": { id: "u2", name: "Priya Patel", email: "restaurant@swigato.com", phone: "9876543211", role: "restaurant", password: "password" },
  "delivery@swigato.com": { id: "u3", name: "Amit Kumar", email: "delivery@swigato.com", phone: "9876543212", role: "delivery", password: "password" },
  "instamart@swigato.com": { id: "u4", name: "Neha Singh", email: "instamart@swigato.com", phone: "9876543213", role: "instamart", password: "password" },
  "admin@swigato.com": { id: "u5", name: "Admin User", email: "admin@swigato.com", phone: "9876543214", role: "admin", password: "password" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const found = mockUsers[email.toLowerCase()];
    if (found && found.password === password) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string, role: UserRole) => {
    setUser({ id: `u${Date.now()}`, name, email, phone: "", role });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);
  const switchRole = useCallback((role: UserRole) => {
    setUser((prev) => prev ? { ...prev, role } : null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
