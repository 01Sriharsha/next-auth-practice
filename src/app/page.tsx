import { Lock } from "lucide-react";

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full items-center justify-center flex-col">
      <div className="space-y-4 text-center border border-gray-600 p-8 rounded-lg">
        <div className="flex items-center gap-x-3 justify-center">
          <Lock className="h-9 w-9" />
          <h1 className="text-4xl font-semibold">Auth Toolkit</h1>
        </div>
        <p className="text-lg">A simple authentication toolkit service</p>
        <div>
          <LoginButton asChild>
            <Button>Signin</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
