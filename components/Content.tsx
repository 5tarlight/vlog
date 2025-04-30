import cn from "@yeahx4/cn";
import { ReactNode } from "react";

export default function Content({
  children,
  className,
  small,
}: {
  children?: ReactNode;
  className?: string;
  small?: boolean;
}) {
  return (
    <div className="flex justify-center">
      <div
        className={cn(
          className,
          "w-full px-4",
          small ? "max-w-3xl" : "max-w-5xl"
        )}
      >
        {children}
      </div>
    </div>
  );
}
