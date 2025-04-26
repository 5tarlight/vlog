"use client";

import cn from "@yeahx4/cn";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      className={cn(
        "cursor-pointer flex items-center",
        "p-2 hover:bg-neutral-200 transition-all rounded-full",
        "dark:hover:bg-neutral-600"
      )}
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      {currentTheme === "dark" ? <BsFillMoonFill /> : <BsFillSunFill />}
    </div>
  );
}
