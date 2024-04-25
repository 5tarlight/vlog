"use client";

import SearchResult from "@/components/search/SearchResult";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchSuspend() {
  const query = useSearchParams();
  const search = query.get("q");

  return (
    <div className="flex justify-center">
      <div className="max-w-[1024px] w-full">
        <h2>검색 : {search}</h2>
        <SearchResult search={search || ""} />
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense>
      <SearchSuspend />
    </Suspense>
  );
}
