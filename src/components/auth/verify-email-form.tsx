"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { verifyEmail } from "@/actions/verify-email-action";

type VerifyEmailFormProps = {};

const VerifyEmailForm = () => {
  const searchparams = useSearchParams();
  const router = useRouter();

  const token = searchparams.get("token");

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const checkToken = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
  }, [token]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      setError("Missing token!");
      return;
    }
    startTransition(() => {
      verifyEmail(token)
        .then((res) => {
          setError("");
          setSuccess(res.success || "something went wrong");
          router.replace("/auth/login/?success=EmailVerified");
        })
        .catch((err) => {
          setSuccess("");
          setError(err.message);
        });
    });
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Verify your email"
        forwardLabel="Login Page"
        forwardDescription="Back to"
        forwardLink="/auth/login"
      >
        <div className={cn((error || success) && "mb-6 w-full")}>
          {error && <FormError error={error} />}
          {success && <FormSuccess success={success} />}
        </div>
        <form onSubmit={handleSubmit} className="flex justify-center">
          {!success && isPending ? (
            <BeatLoader color="green" className="text-center" />
          ) : (
            <Button disabled={isPending}>Verify Email</Button>
          )}
        </form>
      </CardWrapper>
    </div>
  );
};

export default VerifyEmailForm;
