"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContextType, UserInfoType } from "@/types";
import { getCurrentUser } from "@/lib/actions/user.actions";
import axios from "axios";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: ""
}

export const INITIAL_STATE = {
  user: INITIAL_USER,
  isAuthenticated: false,
  setUser: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();
  const [user, setUser] = useState<UserInfoType>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    try {
      const response = await axios.get("/api/auth/check-token");
      if (response.status === 200) {
        const currentUser = await getCurrentUser(response.data.username);

        if (currentUser) {
          setUser({
            id: currentUser._id,
            name: currentUser.name,
            username: currentUser.username,
            email: currentUser.email,
            imageUrl: currentUser.imageUrl
          });

          setIsAuthenticated(true);
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (cookieFallback) {
      checkAuthUser();
    }
  }, [])

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);