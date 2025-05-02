import Content from "@/components/Content";
import PostPreview from "@/components/PostPreview";
import SearchInput from "@/components/SearchInput";
import { searchPosts } from "@/lib/post/posts";
import cn from "@yeahx4/cn";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const query = decodeURIComponent(atob(decodeURIComponent(slug)));

  return {
    title: "검색 결과",
    description: `${query}에 대한 검색 결과입니다.`,
  };
}

export default async function Search({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const query = decodeURIComponent(atob(decodeURIComponent(slug)));
  const posts = await searchPosts(query);
  const scoreSum = posts.reduce((acc, p) => acc + p.score, 0);

  return (
    <Content className="mt-32">
      <div className="text-center mb-20">
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
          검색 결과
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-neutral-600 dark:text-neutral-400">
          “
          <span className="font-semibold text-black dark:text-white break-all">
            {query}
          </span>
          ”에 대한 결과입니다
        </p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            검색 결과가 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {posts.slice(0, 6).map(({ post: { meta, id }, score }, i) => {
            const opacityFactor = 0.85 + (0.15 * score) / scoreSum;

            return (
              <div
                key={i}
                className={cn(
                  "w-full max-w-sm p-2 rounded-xl transition-transform",
                  "hover:scale-[1.025]"
                )}
                style={{ opacity: opacityFactor }}
              >
                <div
                  className={cn(
                    "mb-2 inline-block text-xs font-mono px-2 py-1 rounded-md",
                    "bg-neutral-100 text-neutral-600 dark:bg-neutral-800",
                    "dark:text-neutral-400"
                  )}
                >
                  {Math.floor((score / scoreSum) * 10000) / 100}%
                </div>
                <Link href={`/posts/${id}`}>
                  <PostPreview meta={meta} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-center my-28 w-full">
        <div className="w-full max-w-xl">
          <SearchInput value={query} autoFocus={posts.length === 0} />
        </div>
      </div>
    </Content>
  );
}
