"use client";

import { cn } from "@/lib/utils/cn";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex mt-6 justify-center">
      <div
        className={cn(
          "flex justify-center w-full max-w-[512px] bg-white",
          "border-2 rounded-full shadow-md px-4 transition-all",
          "dark:bg-gray-800 dark:text-white",
          isFocused ? "border-blue-500" : "border-gray-500"
        )}
      >
        <input
          type="search"
          className={cn(
            "w-full bg-transparent p-2 border-gray-500",
            "focus:outline-none"
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="글 제목, 태그, 내용을 검색해보세요"
        />
        <button className="p-2">
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
