import PostPreview from "@/components/PostPreview";
import { parsePost } from "@/lib/post/parser";
import { getPostsBySeries, readContent, series } from "@/lib/post/posts";
import Link from "next/link";

export default function Series({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center my-16">
        <h1 className="font-bold text-2xl text-gray-800">시리즈</h1>
        <p className="font-extrabold md:text-4xl text-3xl text-indigo-600">
          {series[slug].name}
        </p>
      </div>

      {/* Post Previews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {getPostsBySeries(slug)
          .map(async (post) => ({
            meta: parsePost(await readContent(post)).meta,
            post,
          }))
          .map(async (p, i) => {
            const { meta, post } = await p;
            return (
              <Link href={`/posts/${post}`} key={i}>
                <PostPreview meta={meta} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}