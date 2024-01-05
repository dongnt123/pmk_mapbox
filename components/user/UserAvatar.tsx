"use client";

import { FaUser } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { ExtendedUser } from "@/next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DEFAULT_LOGOUT_REDIRECT } from "@/routes";

const UserAvatar = ({ user }: { user: ExtendedUser }) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user.image || ""} alt={user?.name || ""} referrerPolicy="no-referrer" />
          <AvatarFallback className="bg-sky-500"><FaUser className="text-white" /></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white -translate-x-6">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut({ callbackUrl: DEFAULT_LOGOUT_REDIRECT })}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAvatar