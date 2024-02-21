import { Resend } from "resend";

import { AppTitle, AppUrl } from "@/lib/app-constants";
import {
  TwoFactorEmailTemplate,
  VerificationEmailTemplate,
  ResetPasswordEmailTemplate,
} from "@/components/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${AppUrl}/auth/verify-email?token=${token}`;
  const res = await resend.emails.send({
    from: `${AppTitle} <onboarding@resend.dev>`,
    to: email,
    subject: `Your email verification link for ${AppTitle}`,
    react: VerificationEmailTemplate({ confirmationLink, email }),
  });

  return res;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${AppUrl}/auth/new-password?token=${token}`;
  const res = await resend.emails.send({
    from: `${AppTitle} <onboarding@resend.dev>`,
    to: email,
    subject: `Reset password verification link for ${AppTitle}`,
    react: ResetPasswordEmailTemplate({ resetPasswordLink, email }),
  });

  return res;
};

export const sendTwoFactorEmail = async (
  email: string,
  validationCode: string
) => {
  const res = await resend.emails.send({
    from: `${AppTitle} <onboarding@resend.dev>`,
    to: email,
    subject: `Two factor authentication code for ${AppTitle}`,
    react: TwoFactorEmailTemplate({ validationCode }),
  });

  return res;
};
