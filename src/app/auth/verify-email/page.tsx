import { AppTitle } from "@/lib/app-constants";

import VerifyEmailForm from "@/components/auth/verify-email-form";

export default async function VerifyEmailPage() {
  return (
    <div>
      <VerifyEmailForm />
    </div>
  );
}

export const metadata = {
  title: `Verify Email | ${AppTitle}`,
  description: `Verify email to login to your ${AppTitle} account.`,
};
