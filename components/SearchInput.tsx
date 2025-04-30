"use client";

import cn from "@yeahx4/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchInput({
  value: initialValue = "",
  header = false,
}: {
  value?: string;
  header?: boolean;
}) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const search = () => {
    router.push(`/search/${btoa(encodeURIComponent(value.trim()))}`);
  };

  return (
    <div className={cn("flex justify-center w-full", header ? "" : "mt-5")}>
      <div
        className={cn(
          "flex items-center w-full max-w-[512px] px-3 py-1.5",
          "rounded-full border transition-colors",
          "bg-white dark:bg-neutral-900",
          isFocused
            ? "border-neutral-500 ring-1 ring-neutral-400 dark:ring-neutral-500"
            : "border-neutral-300 dark:border-neutral-700"
        )}
      >
        <input
          type="search"
          className={cn(
            "flex-1 bg-transparent px-2 py-1 text-sm",
            "focus:outline-none text-neutral-900 dark:text-neutral-100",
            "placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder={header ? "검색" : "글 제목, 태그, 내용을 검색해보세요"}
        />
        <button
          onClick={search}
          className={cn(
            "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300",
            "transition-colors p-1.5"
          )}
        >
          <FaSearch size={16} />
        </button>
      </div>
    </div>
  );
}
