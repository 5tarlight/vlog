import { getAllPosts } from "@/libs/posts";

export default function Post({ params }: { params: { slugs: string[] } }) {
  const { slugs } = params;
  const posts = getAllPosts();
  const post = posts.find(
    (post) => post.slug.toLowerCase() === slugs.join("/").toLowerCase()
  );

  console.log(post);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <div>Post: {JSON.stringify(post)}</div>;
}
