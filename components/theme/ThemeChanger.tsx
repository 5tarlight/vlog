"use client";

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
      className="cursor-pointer flex items-center"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      {currentTheme === "dark" ? <BsFillMoonFill /> : <BsFillSunFill />}
    </div>
  );
}
