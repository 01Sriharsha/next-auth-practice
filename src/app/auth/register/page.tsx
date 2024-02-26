import { AppTitle } from "@/lib/app-constants";

import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export const metadata = {
  title: `Register | ${AppTitle}`,
  description: `Register to ${AppTitle} and create an account.`,
};