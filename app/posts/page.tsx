import { posts, series } from "@/lib/post/posts";
import PostIinfiniteLoader from "@/components/post-whole/PostInfiniteLoader";

export default function Posts() {
  return <PostIinfiniteLoader posts={posts} series={series} />;
}
