import Content from "@/components/Content";
import SearchResult from "@/components/SearchResult";
import { getAllPosts } from "@/libs/posts";
import { Suspense } from "react";

export default function Search() {
  const posts = getAllPosts();
  return (
    <Content>
      <Suspense>
        <SearchResult posts={posts} />
      </Suspense>
    </Content>
  );
}
