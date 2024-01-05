"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { socialLogin } from "@/constants";

const Social = () => {

  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callBackUrl");

  const handleSignIn = (provider: string) => {
    signIn(provider, {
      callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      {socialLogin.map((info) => (
        <TooltipProvider delayDuration={200} key={info.type}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="lg" className="w-full" variant="outline" type="button" onClick={() => handleSignIn(info.type)}>
                {info.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Login with <span className="capitalize">{info.type}</span></p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

export default Social