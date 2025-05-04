"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderTitle() {
  const pathname = usePathname();

  const [title, setTitle] = useState("YEAHx4");

  useEffect(() => {
    if (pathname.startsWith("/ps-guide")) {
      setTitle("알고리즘 가이드");
    }
  });

  return <span>{title}</span>;
}
