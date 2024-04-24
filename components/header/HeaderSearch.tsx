"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function HeaderSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const searchPost = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div className="flex">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchPost();
          }
        }}
        className="px-[0.6rem] py-[0.3rem] w-[300px] bg-gray-200 rounded-l-lg focus:outline-none"
        placeholder="검색"
      />
      <button
        className="bg-gray-200 rounded-r-lg hover:bg-gray-300 w-8 flex justify-center items-center"
        onClick={searchPost}
      >
        <FaSearch />
      </button>
    </div>
  );
}
