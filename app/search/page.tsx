import Content from "@/components/Content";
import SearchResult from "@/components/SearchResult";
import { getAllPosts } from "@/libs/posts";

export default function Search() {
  const posts = getAllPosts();
  return (
    <Content>
      <SearchResult posts={posts} />
    </Content>
  );
}
