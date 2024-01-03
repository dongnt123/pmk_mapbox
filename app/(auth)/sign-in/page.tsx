"use client";

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader, Navigate } from "@/components/shared";
import { SignInValidation } from "@/lib/validations";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";

const SignIn = () => {

  const { toast } = useToast();
  const router = useRouter();
  const { setUser, isAuthenticated } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof SignInValidation>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/sign-in", values);
      const userData = response.data.currentUser;
      setUser(prevState => ({
        ...prevState,
        id: userData._id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        imageUrl: userData.imageUrl || ""
      }));
      localStorage.setItem("cookieFallback", "verify");
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.response.data.message
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <Form {...form}>
          <div className="w-full md:w-[420px] flex-center flex-col">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="mx-auto object-cover" />
            <h2 className="text-center text-3xl pt-5 sm:pt-12">Login to your account</h2>
            <p className="text-base text-center mt-12">Welcome back, please enter your's details</p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
              <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="text-light">
                {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <Loader />
                    Loading...
                  </div>
                ) : "Sign in"}
              </Button>

              <p className="text-base text-dark text-center mt-2">
                Don't have an account?
                <Link href="/sign-up" className="text-primary text-base ml-1">Sign up</Link>
              </p>
            </form>
          </div>
        </Form>
      )}
    </>
  )
}

export default SignIn