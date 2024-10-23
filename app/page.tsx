import Content from "@/components/Content";
import PostPreview from "@/components/PostPreview";
import SearchInput from "@/components/SearchInput";
import { getRecentPostMeta } from "@/lib/post/posts";
import cn from "@yeahx4/cn";
import Link from "next/link";

export default async function Home() {
  return (
    <Content>
      <h1 className="text-center text-2xl md:text-4xl mt-16 font-extrabold">
        Welcome to YEAHx4 blog
      </h1>
      <SearchInput />

      <div className="my-16">
        <div className="text-center my-16 flex justify-center">
          <h1
            className={cn(
              "font-bold text-3xl text-gray-800 dark:text-gray-100",
              "pb-4 border-b-8 px-4 border-blue-400 dark:border-blue-500 w-fit"
            )}
          >
            최신 포스트
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(await getRecentPostMeta(6)).map(async (p, i) => {
            const { meta, post } = p;
            return (
              <Link href={`/posts/${post}`} key={i}>
                <PostPreview meta={meta} />
              </Link>
            );
          })}
        </div>
      </div>
    </Content>
  );
}
