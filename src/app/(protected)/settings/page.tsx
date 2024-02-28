import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getUserById } from "@/util/user";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { LogoutButton } from "./_components/logout-button";
import { UserUpdateForm } from "./_components/user-update-form";
import { ChangePasswordModal } from "./_components/change-password-modal";

export default async function SettingsPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/auth/login");
  }
  const user = await getUserById(session?.user?.id!);

  return (
    <main className="max-w-screen-lg mx-auto py-6">
      <div className="flex items-center gap-x-3 justify-between">
        <LogoutButton />
        <ChangePasswordModal />
      </div>
      <div className="grid place-items-center">
        <CardWrapper headerLabel="📝 Edit Details">
          <UserUpdateForm userImage={user?.image!} />
        </CardWrapper>
      </div>
    </main>
  );
}
