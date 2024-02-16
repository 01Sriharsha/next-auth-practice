// A reusable component which can be used in both inside a modal or in a separate page
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { login } from "@/actions/login-action";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "./form-error";

type LoginFormProps = {};

export const LoginForm = ({}: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const oauthError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!!"
      : "";

  useEffect(() => {
    searchParams.get("error") === "OAuthAccountNotLinked" &&
      setError("Email already in use with different provider!!");
  }, [searchParams]);

  const onSubmit = (values: LoginSchemaType) => {
    startTransition(async () => {
      login(values)
        .then(() => {
          toast.success("Logged in successfully");
          router.replace(DEFAULT_LOGIN_REDIRECT);
        })
        .catch((err) => {
          setError(err.message || "Something went wrong!");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Sign In"
      forwardDescription="Don't have an account?"
      forwardLabel="Register"
      forwardLink="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@emaple.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Example@123"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <FormError error={error || oauthError} />}
          <Button type="submit" disabled={isPending} className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
