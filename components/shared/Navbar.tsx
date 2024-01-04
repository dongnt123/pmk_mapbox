"use client";

import Link from "next/link";

import { useContentContext } from "@/context/ContentContext";
import { Button } from "../ui/button";
import { CloseIcon, MenuIcon } from "./Icon";

const Navbar = () => {

  const { menuSideBarStatus, setMenuSideBarStatus } = useContentContext();

  return (
    <header className="h-[60px] bg-light shadow-md relative z-[20] px-[24px] md:px-[40px] flex justify-between items-center">
      <div className="flex justify-center items-center cursor-pointer group" onClick={() => setMenuSideBarStatus(!menuSideBarStatus)}>
        {menuSideBarStatus ? (
          <CloseIcon className="fill-primary group-hover:fill-sky-500" />
        ) : (
          <MenuIcon className="fill-primary group-hover:fill-sky-500" />
        )}
      </div>
      <div>
        <Button variant="default" asChild>
          <Link href="/auth/sign-in">Login</Link>
        </Button>
      </div>
    </header>
  )
}

export default Navbar