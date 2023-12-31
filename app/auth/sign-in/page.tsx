"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/lib/validation";
import CardWrapper from "../_components/CardWrapper";
import { FormError, FormSuccess } from "@/components/shared";
import { handleSignInAction } from "@/lib/actions/auth.actions";
import Social from "../_components/Social";

const SignIn = () => {

  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callBackUrl");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof SignInValidation>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      handleSignInAction(values, callBackUrl)
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
      headerLabel="Login to your account"
      headerDesc="Welcome back, please enter your's details"
      backButtonLabel="Don't have an account?"
      backButtonButtonLabel="Sign up"
      backButtonLink="/auth/sign-up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-2">
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
          <Social />
          <Button type="submit" disabled={isPending}>Sign in</Button>
        </form>
      </Form>
    </CardWrapper >
  )
}

export default SignIn