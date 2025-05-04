"use client";

import cn from "@yeahx4/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PsSidebarLink({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const pathname = usePathname();
  const name = id.split("/")[1];
  const isActive = pathname === `/ps-guide/${name}`;

  return (
    <Link
      href={`/ps-guide/${name}`}
      className={cn(
        "px-2 py-1 rounded-md text-sm font-medium",
        "transition-colors duration-200",
        isActive
          ? cn(
              "bg-neutral-100 dark:bg-neutral-800 text-black",
              "dark:text-white font-semibold"
            )
          : cn(
              "text-neutral-600 dark:text-neutral-400",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800",
              "hover:text-black dark:hover:text-white"
            )
      )}
    >
      {title}
    </Link>
  );
}
