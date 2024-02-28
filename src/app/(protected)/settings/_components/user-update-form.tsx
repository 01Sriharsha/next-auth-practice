"use client";

import Image from "next/image";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { UserDetailsSchema, UserDetailsSchemaType } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { updateUserDetails } from "@/actions/settings-action";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type UserUpdateFormProps = {
  userImage?: string;
};

export const UserUpdateForm = ({ userImage }: UserUpdateFormProps) => {
  const user = useCurrentUser();
  const form = useForm<UserDetailsSchemaType>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      name: user?.name || "",
      twoFactorEnable: user?.isTwoFactorEnabled || false,
    },
  });

  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState(userImage);
  const [fileError, setFileError] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files == null || files?.length === 0) {
      setFileError("Select an image");
      return;
    }
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const img = e.target?.result?.toString()!;
      setImage(img);
    };
    fileReader.readAsDataURL(file);
  };

  const onSubmit = (values: UserDetailsSchemaType) => {
    values.image = image ?? "";
    startTransition(() => {
      updateUserDetails(values)
        .then((res) => {
          toast.success(res.success);
        })
        .catch((err) => {
          toast.error(err.message || "Something went wrong!");
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div
          className={cn(
            "relative w-28 h-28 group mx-auto rounded-full",
            image && "cursor-pointer hover:opacity-50 transition-all"
          )}
        >
          <div>
            <Image
              src={image || "/user.png"}
              alt={user?.name!}
              width={1000}
              height={1000}
              quality={80}
              className="object-cover rounded-full"
            />
            <button
              type="button"
              onClick={() => {
                setImage("");
              }}
              className={cn(
                "absolute transition-transform duration-300 ease-in-out top-12 right-12",
                image
                  ? "invisible group-hover:visible translate-y-12 group-hover:translate-y-0"
                  : "hidden"
              )}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="John Doe"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  id="image"
                  type="file"
                  placeholder="Choose File"
                  disabled={isPending}
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              </FormControl>
              <FormMessage>{fileError}</FormMessage>
            </FormItem>
          )}
        />
        {!user?.isOAuth && (
          <FormField
            control={form.control}
            name="twoFactorEnable"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-5">
                <div>
                  <FormLabel>Two factor Authentication</FormLabel>
                  <FormDescription>
                    Enable two factor authentication for this account.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" size={"sm"} className="w-full">
          Update
        </Button>
      </form>
    </Form>
  );
};
