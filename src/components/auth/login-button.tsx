"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type LoginButtonProps = {
  children: ReactNode;
  asChild?: boolean;
  mode?: "redirect" | "modal";
};

export const LoginButton = ({ children, asChild, mode }: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <div>
        <p>Login Modal</p>
      </div>
    );
  }
  return <div onClick={onClick}>{children}</div>;
};
