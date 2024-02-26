import { AppTitle } from "@/lib/app-constants";

import { NewPasswordForm } from "@/components/auth/new-password-form";

export default async function NewPasswordPage() {
  return (
    <div>
      <NewPasswordForm />
    </div>
  );
}

export const metadata = {
  title: `New Password | ${AppTitle}`,
  description: `Reset ${AppTitle} account password.`,
};
