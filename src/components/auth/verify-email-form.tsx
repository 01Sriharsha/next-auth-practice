"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { CardWrapper } from "./card-wrapper";

type VerifyEmailFormProps = {};

const VerifyEmailForm = () => {
  const searchparams = useSearchParams();

  const onSubmit = useCallback(() => {
    console.log(searchparams);
  }, [searchparams]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      <CardWrapper
        headerLabel="Verify your email"
        forwardLabel="Login Page"
        forwardDescription="Back to"
        forwardLink="/auth/login"
      >
        <p>{searchparams.get("token")}</p>
      </CardWrapper>
    </div>
  );
};

export default VerifyEmailForm;
