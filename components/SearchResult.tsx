"use client";

import { Post } from "@/libs/posts";
import { useSearchParams } from "next/navigation";
import PostPreview from "./PostPreview";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SearchResult({ posts }: { posts: Post[] }) {
  const searchParam = useSearchParams();
  const query = (searchParam.get("q") || "").toLowerCase();
  const [inputContent, setInput] = useState(query);

  const count = (original: string, query: string) => {
    if (query.length === 0) return 0;

    let count = 0;
    let index = original.indexOf(query);
    while (index !== -1) {
      count++;
      index = original.indexOf(query, index + 1);
    }
    return count;
  };

  const scores = posts.map((p, i) => {
    const title = count(p.title.toLowerCase(), query);
    const description = count(p.description.toLowerCase(), query);
    const tags = p.tags.reduce(
      (acc, tag) => acc + count(tag.toLowerCase(), query),
      0
    );
    const content = count(p.content.toLowerCase(), query);
    const series = count(p.series?.toLowerCase() || "", query);

    return {
      index: i,
      score: title * 3 + description * 2 + tags + content * 2 + series * 2,
    };
  });

  const result = posts
    .filter((_, i) => scores[i].score > 0)
    .sort(
      (a, b) => scores[posts.indexOf(b)].score - scores[posts.indexOf(a)].score
    )
    .slice(0, 5);

  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search?q=${inputContent}`);
  };

  return (
    <>
      <div className="search-container">
        <input
          className="search-input"
          placeholder="찾고 싶은 내용을 입력해보세요."
          value={inputContent}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
      <h1 className="title-recent-post">검색 결과 : {query}</h1>
      <div>
        {result.map((p, i) => (
          <PostPreview post={p} key={i} />
        ))}
      </div>
    </>
  );
}
