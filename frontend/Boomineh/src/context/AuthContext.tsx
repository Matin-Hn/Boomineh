import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken, logout as apiLogout } from "@/api/authAPI";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (access: string, refresh: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (access: string, refresh: string) => {
    localStorage.setItem("refresh", refresh);
    setAccessToken(access);
    setIsAuthenticated(true);
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
