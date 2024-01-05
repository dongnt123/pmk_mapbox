"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import CardWrapper from "../_components/CardWrapper";
import { handleSignUpAction } from "@/lib/actions/auth.actions";
import { FormError, FormSuccess } from "@/components/shared";

const SignUp = () => {

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof SignUpValidation>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      handleSignUpAction(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  }

  return (
    <CardWrapper
      headerLabel="Create a new account"
      headerDesc="To use PMK Mapbox, please enter your details"
      backButtonLabel="Already have an account?"
      backButtonButtonLabel="Log in"
      backButtonLink="/auth/sign-in"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Nguyen Tien Dong" type="text" className="shad-input" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="dongnt@mz.co.kr" type="email" className="shad-input" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" className="shad-input" {...field} disabled={isPending} autoComplete="on" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" variant="default" disabled={isPending}>Sign up</Button>
        </form>
      </Form >
    </CardWrapper >
  )
}

export default SignUp