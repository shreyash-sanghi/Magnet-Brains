import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../API/axiosApi.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axiosInstance.get("/user/verify-token");
        console.log(res);
        setAuthUser(res.data.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
