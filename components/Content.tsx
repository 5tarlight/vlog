import cn from "@yeahx4/cn";
import { ReactNode } from "react";

export default function Content({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex justify-center">
      <div className={cn(className, "max-w-5xl w-full px-4")}>{children}</div>
    </div>
  );
}
