import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { FaCreativeCommonsBy, FaGithub } from "react-icons/fa6";

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
        <div className="flex gap-4 text-3xl justify-self-end">
          <Link href="https://github.com/5tarlight/vlog">
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
}
