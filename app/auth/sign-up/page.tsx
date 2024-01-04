"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader } from "@/components/shared";
import { SignUpValidation } from "@/lib/validations";

const SignUp = () => {

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof SignUpValidation>) => {

  }

  return (
    <Form {...form}>
      <div className="w-full md:w-[420px] flex-center flex-col">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="mx-auto object-cover" />
        <h2 className="text-center text-3xl pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-base text-center mt-12">To use PMK Mapbox, please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
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
            {false ? (
              <div className="flex justify-center items-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : "Sign up"}
          </Button>

          <p className="text-base text-dark text-center mt-2">
            Already have an account?
            <Link href="/sign-in" className="text-primary text-base ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form >
  )
}

export default SignUp