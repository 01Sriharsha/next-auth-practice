"use client";

import { useTransition } from "react";
import { logout } from "@/actions/logout-action";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };
  return (
    <div>
      <Button
        disabled={isPending}
        variant={"destructive"}
        size={"sm"}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};
