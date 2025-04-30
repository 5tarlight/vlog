import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import cn from "@yeahx4/cn";
import DroppingTitle from "@/components/not-found/DroppingTitle";
import NotFoundJoke from "@/components/not-found/NotFoundJoke";

export default function NotFound() {
  return (
    <div
      className={cn(
        "w-full min-h-screen px-4 flex flex-col items-center justify-center",
        "text-center -mt-16"
      )}
    >
      <DroppingTitle />
      <NotFoundJoke />
      <p
        className={cn(
          "text-2xl font-medium mb-6",
          "text-neutral-700 dark:text-neutral-300"
        )}
      >
        페이지를 찾을 수 없습니다.
      </p>
      <p
        className={cn(
          "text-base mb-10 max-w-md",
          "text-neutral-500 dark:text-neutral-400"
        )}
      >
        주소가 잘못되었거나, 삭제된 페이지일 수 있어요.
      </p>
      <Link
        href="/"
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors",
          "border border-neutral-400 dark:border-neutral-600",
          "text-neutral-800 dark:text-neutral-100",
          "hover:bg-neutral-100 dark:hover:bg-neutral-800"
        )}
      >
        <FaArrowLeft className="text-xs" />
        홈으로 돌아가기
      </Link>
    </div>
  );
}
