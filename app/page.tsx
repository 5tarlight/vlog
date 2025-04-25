import Content from "@/components/Content";
import PostPreview from "@/components/PostPreview";
import SearchInput from "@/components/SearchInput";
import { getRecentPostMeta } from "@/lib/post/posts";
import cn from "@yeahx4/cn";
import Link from "next/link";

export default async function Home() {
  return (
    <Content>
      <div className="flex flex-col items-center">
        <h1 className="text-center text-2xl md:text-4xl mt-16 font-extrabold">
          예사롭지않은블로그
        </h1>

        <div className="flex flex-col items-center mt-4 text-gray-600 dark:text-gray-400">
          <p>
            웹과 wasm, AI에 관심이 많은 대학생 <b>김규산</b>의 블로그입니다.
          </p>
          <p>예사롭지 않은 경험, 기술, 회고록 등을 올립니다.</p>
        </div>
      </div>

      {/* <div className="my-16">
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
      </div> */}
    </Content>
  );
}
