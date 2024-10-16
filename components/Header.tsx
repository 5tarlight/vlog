import { cn } from "@/utils/cn";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center h-[80px] shadow-md sticky top-0 bg-white">
      <div
        className={cn(
          "max-w-[1024px] w-full items-center flex justify-between",
          "px-4 select-none"
        )}
      >
        <div className="text-lg md:text-2xl font-extrabold">
          <Link href="/">YEAHx4 Blog</Link>
        </div>
        <div></div>
      </div>
    </header>
  );
}
