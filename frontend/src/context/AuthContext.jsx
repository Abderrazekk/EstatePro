import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user", err);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password });
    const { token, ...userData } = res.data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return userData;
  };

  const register = async (name, email, phone, password) => {
    const res = await axios.post("/api/auth/register", {
      name,
      email,
      phone,
      password,
    });
    const { token, ...userData } = res.data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return userData;
  };

  // NEW: Google Login
  const googleLogin = async (googleToken) => {
    const res = await axios.post("/api/auth/google", { token: googleToken });
    const { token, ...userData } = res.data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  const toggleWishlist = async (propertyId) => {
    const res = await axios.post(`/api/users/wishlist/${propertyId}`);
    setUser((prev) => ({ ...prev, wishlist: res.data.wishlist }));
  };

  const refreshUser = async () => {
    const res = await axios.get("/api/auth/me");
    setUser(res.data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        googleLogin, // Exported here
        logout,
        toggleWishlist,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
