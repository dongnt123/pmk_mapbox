"use client";

import Link from "next/link";

import { useContentContext } from "@/context/ContentContext";
import { Button } from "../ui/button";
import { UserAvatar } from "../user";
import { CloseIcon, MenuIcon } from "./Icon";
import { useUserContext } from "@/context/AuthContext";

const Navbar = () => {

  const { menuSideBarStatus, setMenuSideBarStatus } = useContentContext();
  const { user } = useUserContext();

  return (
    <header className="h-[60px] bg-light shadow-md relative z-[20] px-[24px] md:px-[40px] flex justify-between items-center">
      <div className="flex justify-center items-center cursor-pointer group" onClick={() => setMenuSideBarStatus(!menuSideBarStatus)}>
        {menuSideBarStatus ? (
          <CloseIcon className="fill-dark group-hover:fill-primary" />
        ) : (
          <MenuIcon className="fill-dark group-hover:fill-primary" />
        )}
      </div>
      <div>
        {user.username ? (
          <UserAvatar user={user} />
        ) : (
          <Button asChild>
            <Link href="/sign-in" className="bg-primary text-light">Login</Link>
          </Button>
        )}
      </div>
    </header>
  )
}

export default Navbar