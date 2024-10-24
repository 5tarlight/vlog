import Link from "next/link";
import ThemeChanger from "./theme/ThemeChanger";
import cn from "@yeahx4/cn";

export default function Header() {
  return (
    <header
      className={cn(
        "flex justify-center h-[80px] shadow-md sticky top-0 bg-white",
        "dark:bg-gray-800 dark:text-white z-10"
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
        <div className="flex gap-2">
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
}
