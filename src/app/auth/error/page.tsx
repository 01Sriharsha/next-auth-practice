import { AppTitle } from "@/lib/app-constants";
import { CardWrapper } from "@/components/auth/card-wrapper";

export default async function AuthErrorPage() {
  return (
    <div>
      <CardWrapper
        headerLabel="⚠️Error"
        forwardDescription="Back to"
        forwardLabel="Login Page"
        forwardLink="/auth/login"
      >
        <p className="text-lg font-semibold text-center">
          Oops! Something went wrong!!
        </p>
      </CardWrapper>
    </div>
  );
}

export const metadata = {
  title: `Error | ${AppTitle}`,
  description: `Oops! Something went wrong!!`,
};
