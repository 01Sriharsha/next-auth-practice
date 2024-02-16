import { ReactNode } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";

type CardWrapperProps = {
  children: ReactNode;
  headerLabel: string;
  forwardLabel: string;
  forwardLink: string;
  forwardDescription: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  forwardLabel,
  forwardLink,
  forwardDescription,
  headerLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col">
        {showSocial && (
          <div className="mb-3 w-full space-y-4">
            <Separator orientation="horizontal" />
            <Social />
          </div>
        )}
        <div className="flex items-center gap-x-1 text-sm">
          <p>{forwardDescription}</p>
          <Link href={forwardLink} className="underline" replace>
            {forwardLabel}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
