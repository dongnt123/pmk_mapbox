"use client";

import { createContext, useContext, useState } from "react";

import { AuthContextType, UserInfoType } from "@/types";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: ""
}

export const INITIAL_STATE = {
  user: INITIAL_USER,
  setUser: () => { }
}

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<UserInfoType>(INITIAL_USER);

  const value = {
    user,
    setUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);