import cn from "@yeahx4/cn";
import Link from "next/link";
import { FaCreativeCommonsBy, FaGithub, FaRss } from "react-icons/fa6";

export default function Footer() {
  // WARN : This will not automatically updated!
  // You should re-build or re-deploy to update
  const year = new Date().getFullYear();

  return (
    <footer className={cn("flex justify-center px-4")}>
      <div
        className={cn(
          "max-w-[1024px] w-full border-t border-gray-500",
          "grid grid-cols-1 sm:grid-cols-3 p-4 h-32 items-center"
        )}
      >
        <div className="justify-self-start flex gap-1.5">
          <span>&copy; 2024{`-${year}`} Kyusan</span>
          <span className="hidden lg:block">(YEAHx4)</span>
          <span>Kim.</span>
        </div>
        <div
          className={cn(
            "text-3xl justify-self-center hidden sm:block",
            "font-sm sm:font-normal"
          )}
        >
          <FaCreativeCommonsBy />
        </div>
        <div className="gap-8 text-3xl justify-self-end hidden sm:flex">
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
