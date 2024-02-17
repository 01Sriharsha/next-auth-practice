import { Resend } from "resend";

import { AppTitle, AppUrl } from "@/lib/app-constants";
import { VerificationEmailTemplate } from "@/components/templates/verification-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${AppUrl}/auth/verify-email?token=${token}`;
  const res = await resend.emails.send({
    from: `${AppTitle} <onboarding@resend.dev>`,
    to: email,
    subject: `Your email verification link for ${AppTitle}`,
    react: VerificationEmailTemplate({ token, confirmationLink, email }),
  });

  return res;
};
