"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { NewPasswordSchema, NewPasswordSchemaType } from "@/schemas";
import { changePassword } from "@/actions/settings-action";
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

export const ChangePasswordForm = () => {
  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: NewPasswordSchemaType) => {
    confirm("Are you sure want to change the password?") &&
      startTransition(() => {
        changePassword(values)
          .then((res) => {
            toast.success(res.success);
            form.reset();
          })
          .catch((err) => {
            toast.error(err.message || "Something went wrong!");
          });
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <Button type="submit" size={"sm"} className="w-full">
          Change Password
        </Button>
      </form>
    </Form>
  );
};
