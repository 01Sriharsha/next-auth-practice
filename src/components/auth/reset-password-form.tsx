"use client";

import { useState, useTransition } from "react";
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
import { ResetSchema, type ResetSchemaType } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { resetPassword } from "@/actions/reset-password-action";

type ResetPasswordFormProps = {};

export const ResetPasswordForm = ({}: ResetPasswordFormProps) => {
  const form = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (values: ResetSchemaType) => {
    startTransition(() => {
      resetPassword(values)
        .then((res) => {
          setError("");
          setSuccess(res.success);
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
        headerLabel="Reset Password"
        forwardLabel="Login"
        forwardLink="/auth/login"
        forwardDescription="Back to"
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
            </div>
            {error && <FormError error={error} />}
            {success && <FormSuccess success={success} />}
            <Button type="submit" disabled={isPending} className="w-full">
              Send Reset Email
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
