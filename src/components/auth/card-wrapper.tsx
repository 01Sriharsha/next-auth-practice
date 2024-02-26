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
import { cn } from "@/lib/utils";

type CardWrapperProps = {
  children: ReactNode;
  headerLabel: string;
  forwardLabel?: string;
  forwardLink?: string;
  forwardDescription?: string;
  showSocial?: boolean;
  className?: string;
};

export const CardWrapper = ({
  children,
  forwardLabel,
  forwardLink,
  forwardDescription,
  headerLabel,
  showSocial,
  className,
}: CardWrapperProps) => {
  return (
    <Card className={cn("shadow-md", className ?? "w-[400px]")}>
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
          <Link href={forwardLink || "/"} className="underline" replace>
            {forwardLabel}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
