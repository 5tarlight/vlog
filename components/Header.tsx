"use client";

import Link from "next/link";
import ThemeChanger from "./theme/ThemeChanger";
import cn from "@yeahx4/cn";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "fixed top-0 justify-center h-[80px] shadow-md w-full flex",
        "dark:bg-gray-800 dark:text-white z-10 trasition-transform",
        "duration-300 bg-white",
        isVisible ? "translate-y-0" : "-translate-y-80"
      )}
    >
      <div
        className={cn(
          "max-w-[1024px] w-full items-center flex justify-between",
          "px-4 select-none"
        )}
      >
        <div className="text-lg md:text-2xl font-extrabold">
          <Link href="/">YEAHx4 Blog</Link>
        </div>
        <div className="hidden md:block w-[60%]">
          <SearchInput header />
        </div>
        <div className="flex gap-2 items-center">
          <Link href="/posts" className="mt-1">
            글 목록
          </Link>
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
}
