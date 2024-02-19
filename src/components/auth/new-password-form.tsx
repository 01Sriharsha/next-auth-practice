"use client";

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
import { NewPasswordSchema, type NewPasswordSchemaType } from "@/schemas";
import { newPassword } from "@/actions/new-password";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";

type NewPasswordFormProps = {};

export const NewPasswordForm = ({}: NewPasswordFormProps) => {
  const searchparams = useSearchParams();
  const router = useRouter();

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = searchparams.get("token");

  const checkToken = useCallback(() => {
    if (!token) {
      setError("Token is missing!");
      return;
    }
  }, [token]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const onSubmit = (values: NewPasswordSchemaType) => {
    if (!token) {
      setError("Token is missing!");
      return;
    }
    startTransition(() => {
      newPassword(token, values)
        .then((res) => {
          setError("");
          setSuccess(res.success);
          router.replace("/auth/login?success=PasswordUpdated");
        })
        .catch((err) => {
          setSuccess("");
          setError(err.message);
        });
    });
  };
  return (
    <div>
      <CardWrapper
        headerLabel="Set New Password"
        forwardLabel="Login"
        forwardLink="/auth/login"
        forwardDescription="Back to"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Example@123"
                        disabled={isPending}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <FormError error={error} />}
            {success && <FormSuccess success={success} />}
            <Button type="submit" disabled={isPending} className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};