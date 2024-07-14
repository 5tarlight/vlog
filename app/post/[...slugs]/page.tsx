import PostContent from "@/components/PostContent";
import { serializeMdx } from "@/libs/mdx";
import { getAllPosts } from "@/libs/posts";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: { slugs: string[] };
}) {
  const { slugs } = params;
  const posts = getAllPosts();
  const post = posts.find(
    (post) => post.slug.toLowerCase() === slugs.join("/").toLowerCase()
  );

  if (!post) {
    notFound();
  }

  const mdx = await serializeMdx(post.content);

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
      </div>
      <div>
        <PostContent mdx={mdx} />
      </div>
    </div>
  );
}
