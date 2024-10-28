import cn from "@yeahx4/cn";
import Link from "next/link";
import { FaCreativeCommonsBy, FaGithub, FaRss } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("flex justify-center px-4")}>
      <div
        className={cn(
          "max-w-[1024px] w-full border-t border-gray-500",
          "grid grid-cols-3 p-4 h-32 items-center"
        )}
      >
        <div className="justify-self-start">
          &copy; 2024{year !== 2024 && `~${year}`} YEAHx4.
        </div>
        <div className="text-3xl justify-self-center">
          <FaCreativeCommonsBy />
        </div>
        <div className="flex gap-8 text-3xl justify-self-end">
          <Link
            href="/rss"
            className={cn(
              "hidden items-center text-lg font-extrabold gap-2",
              "md:flex bg-yellow-400 dark:bg-yellow-600 px-2 py-1 rounded-md"
            )}
          >
            <FaRss />
            <span>RSS</span>
          </Link>
          <Link href="https://github.com/5tarlight/vlog">
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
}
