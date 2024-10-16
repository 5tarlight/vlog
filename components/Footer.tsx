import { cn } from "@/utils/cn";
import Link from "next/link";
import { FaCreativeCommonsBy, FaGithub } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center">
      <div
        className={cn(
          "max-w-[1024px] w-full border-t border-gray-500",
          "flex justify-between items-center p-4 h-32"
        )}
      >
        <div>&copy; 2024{year !== 2024 && `~${year}`} YEAHx4.</div>
        <div className="text-3xl">
          <FaCreativeCommonsBy />
        </div>
        <div className="flex gap-4 text-3xl">
          <Link href="https://github.com/5tarlight/vlog">
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
}
