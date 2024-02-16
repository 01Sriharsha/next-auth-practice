"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type SocialProviders = "google" | "github";

type SocialProps = {};

export const Social = ({}: SocialProps) => {
  const handleClick = async (provider: SocialProviders) => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center justify-center gap-x-8 w-full">
      <button onClick={() => handleClick("google")}>
        <FcGoogle className="h-6 w-6" />
      </button>
      <button onClick={() => handleClick("github")}>
        <FaGithub className="h-6 w-6" />
      </button>
    </div>
  );
};
