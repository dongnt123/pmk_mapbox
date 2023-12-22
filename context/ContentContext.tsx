"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { ContentContextType } from "@/types";

export const INITIAL_STATE = {
  menuSideBarStatus: false,
  setMenuSideBarStatus: () => { }
}

const ContentContext = createContext<ContentContextType>(INITIAL_STATE);

const ContentProvider = ({ children }: { children: React.ReactNode }) => {

  const [menuSideBarStatus, setMenuSideBarStatus] = useState<boolean>(false);

  const value = {
    menuSideBarStatus,
    setMenuSideBarStatus
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}

export default ContentProvider;

export const useContentContext = () => useContext(ContentContext);