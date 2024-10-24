import Content from "@/components/Content";
import PostPreview from "@/components/PostPreview";
import SearchInput from "@/components/SearchInput";
import { searchPosts } from "@/lib/post/posts";
import Link from "next/link";

export default async function Search({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const query = decodeURIComponent(atob(decodeURIComponent(slug)));
  const posts = await searchPosts(query);

  const scoreSum = posts.reduce((acc, p) => acc + p.score, 0);

  return (
    <Content className="mt-16">
      <div className="text-center mb-16">
        <h1 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-4">
          검색 결과
        </h1>
        <p className="font-extrabold md:text-4xl text-3xl text-indigo-600 dark:text-indigo-300">
          {query}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            검색 결과가 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {posts.slice(0, 6).map((p, i) => {
            const {
              post: { meta, id },
              score,
            } = p;
            return (
              <div
                key={i}
                className="w-full max-w-xs transition-transform transform hover:scale-105"
              >
                <div className="text-center mb-4 w-full font-bold text-indigo-700 dark:text-indigo-300">
                  {Math.floor((score / scoreSum) * 10000) / 100} %
                </div>
                <Link href={`/posts/${id}`}>
                  <PostPreview meta={meta} />
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center mt-32 w-full">
        <SearchInput value={query} />
      </div>
    </Content>
  );
}
