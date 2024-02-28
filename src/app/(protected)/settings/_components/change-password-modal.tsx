"use client";

import { Fragment } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangePasswordForm } from "./change-password-form";
import { Button } from "@/components/ui/button";

type ChangePasswordModalProps = {};

export const ChangePasswordModal = ({}: ChangePasswordModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Change Password</Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader className="w-full">
          <h2 className="text-2xl font-semibold text-center">
            🔑 Change Password
          </h2>
        </DialogHeader>
        <Fragment>
          <ChangePasswordForm />
        </Fragment>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
