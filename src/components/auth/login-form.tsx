// A reusable component which can be used in both inside a modal or in a separate page
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";

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
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  const oauthError = useCallback(() => {
    searchParams.get("error") === "OAuthAccountNotLinked" &&
      setError("Email already in use with different provider!!");
    searchParams.get("success") === "EmailVerified" &&
      setSuccess("Email verified!!");
    searchParams.get("success") === "PasswordUpdated" &&
      setSuccess("Password Updated!!");
  }, [searchParams]);

  useEffect(() => {
    oauthError();
  }, [oauthError]);

  const onSubmit = (values: LoginSchemaType) => {
    startTransition(async () => {
      login(values)
        .then((res) => {
          setError("");
          if (res?.twoFactor) {
            setTwoFactor(res.twoFactor);
            return;
          }
          setSuccess(res?.success || "Logged in successfully");
          router.replace(DEFAULT_LOGIN_REDIRECT);
        })
        .catch((err) => {
          setSuccess("");
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
            {twoFactor ? (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="000000"
                        disabled={isPending}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
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
              </>
            )}
            <Button
              type="button"
              variant={"link"}
              className="text-sm text-gray-600 px-1"
              asChild
            >
              <Link href={"/auth/reset"}>Forgot Password?</Link>
            </Button>
          </div>
          {error && <FormError error={error} />}
          {success && <FormSuccess success={success} />}
          <Button type="submit" disabled={isPending} className="w-full">
            {twoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
