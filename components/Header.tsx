import Link from "next/link";
import ThemeChanger from "./theme/ThemeChanger";
import cn from "@yeahx4/cn";
import Image from "next/image";
import { LuGithub } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";

export default function Header() {
  return (
    <header
      className={cn(
        "fixed top-0 justify-center h-[80px] shadow-md w-full flex",
        "dark:bg-neutral-900/70 dark:text-white z-10 transition-transform",
        "duration-300 bg-white/60 backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "max-w-[1024px] w-full items-center flex justify-between",
          "px-4 select-none"
        )}
      >
        <div className="text-lg md:text-xl font-extrabold">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/yeahx4.png"
              alt="YEAHx4"
              width={40}
              height={40}
              className="inline-block rounded-full align-middle -mt-2"
            />
            {/* <HeaderTitle /> */}
            <span>YEAHx4</span>
          </Link>
        </div>
        <div className="gap-4 items-center hidden sm:flex">
          {/* <SearchInput header /> */}
          <Link
            href="/posts"
            className={cn(
              "relative after:absolute after:left-0 after:bottom-0 after:w-0",
              "after:h-[1px] after:bg-current after:transition-all after:duration-300",
              "hover:after:w-full text-neutral-800/90 dark:text-white/80"
            )}
          >
            Posts
          </Link>
          <Link
            // href="https://ps-guide.yeahx4.me"
            href="/ps-guide"
            className={cn(
              "relative after:absolute after:left-0 after:bottom-0 after:w-0",
              "after:h-[1px] after:bg-current after:transition-all after:duration-300",
              "hover:after:w-full text-neutral-800/90 dark:text-white/80"
            )}
          >
            PS-Guide
          </Link>
          <Link
            href="https://yeahx4.me"
            className={cn(
              "relative after:absolute after:left-0 after:bottom-0 after:w-0",
              "after:h-[1px] after:bg-current after:transition-all after:duration-300",
              "hover:after:w-full text-neutral-800/90 dark:text-white/80"
            )}
          >
            About
          </Link>
        </div>
        <div className="flex gap-1 items-center text-lg">
          <Link
            href="/ps-guide"
            className={cn(
              "px-2 py-1 hover:bg-neutral-200",
              "dark:hover:bg-neutral-600 transition-all rounded-full",
              "flex sm:hidden items-center justify-center"
            )}
          >
            <span className="font-bold text-base sm:text-lg">PS</span>
          </Link>
          <Link
            href="/search"
            className={cn(
              "p-2 hover:bg-neutral-200 transition-all rounded-full",
              "dark:hover:bg-neutral-600"
            )}
          >
            <IoSearchSharp />
          </Link>
          <Link
            href="https://github.com/5tarlight/vlog"
            target="_blank"
            className={cn(
              "p-2 hover:bg-neutral-200 transition-all rounded-full",
              "dark:hover:bg-neutral-600"
            )}
          >
            <LuGithub />
          </Link>
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
}
