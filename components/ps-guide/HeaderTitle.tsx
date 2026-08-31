"use client";

import { usePathname } from "next/navigation";

export default function HeaderTitle() {
  const pathname = usePathname();
  const title = pathname.startsWith("/ps-guide")
    ? "알고리즘 가이드"
    : "YEAHx4";

  return <span>{title}</span>;
}
