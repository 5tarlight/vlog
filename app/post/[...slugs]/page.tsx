import { getAllPosts } from "@/libs/posts";
import { notFound } from "next/navigation";

export default function Post({ params }: { params: { slugs: string[] } }) {
  const { slugs } = params;
  const posts = getAllPosts();
  const post = posts.find(
    (post) => post.slug.toLowerCase() === slugs.join("/").toLowerCase()
  );

  if (!post) {
    notFound();
  }

  return <div>Post: {JSON.stringify(post)}</div>;
}
