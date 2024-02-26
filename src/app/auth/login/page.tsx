import { AppTitle } from "@/lib/app-constants";

import { LoginForm } from "@/components/auth/login-form";

type SigninPageProps = {};

export default function LoginPage({}: SigninPageProps) {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export const metadata = {
  title: `Login | ${AppTitle}`,
  description: `Login to your ${AppTitle} account with email and password.`,
};
