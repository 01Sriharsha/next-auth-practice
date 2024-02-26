import { AppTitle } from "@/lib/app-constants";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default async function ResetPasswordPage() {
  return <ResetPasswordForm />;
}

export const metadata = {
  title: `Reset Password | ${AppTitle}`,
  description: `Reset your ${AppTitle} account password.`,
};
