import Content from "@/components/Content";
import PostPreview from "@/components/PostPreview";
import { getFeaturedPostMeta, getRecentPostMeta } from "@/lib/post/posts";
import cn from "@yeahx4/cn";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default async function Home() {
  return (
    <>
      <Content>
        <div className="flex flex-col items-center mt-32">
          <h1 className="text-center text-2xl md:text-4xl font-extrabold">
            예사롭지않은블로그
          </h1>

          <div className="flex flex-col items-center mt-8 text-neutral-600 dark:text-neutral-400">
            <p>
              웹과 wasm, AI에 관심이 많은 대학생 <b>김규산</b>의 블로그입니다.
            </p>
            <p>예사롭지 않은 경험, 기술, 회고록 등을 올립니다.</p>
          </div>

          <div className="flex mt-12 gap-8">
            <Link href="https://yeahx4.me">
              <button
                className={cn(
                  "bg-black hover:bg-neutral-800 text-white py-2 px-4 rounded",
                  "flex items-center gap-2 hover:gap-3 transition-all",
                  "dark:bg-white dark:text-black duration-150",
                  "group"
                )}
              >
                <span>프로필 보기</span>
                <FaArrowRight className="-rotate-45 transition-all transform group-hover:-translate-y-0.5" />
              </button>
            </Link>

            <Link href="/posts">
              <button
                className={cn(
                  "bg-transparent border text-black border-black dark:text-white dark:border-white",
                  "py-2 px-4 rounded duration-150",
                  "flex items-center gap-2 hover:gap-3 transition-all",
                  "group"
                )}
              >
                <span>모든 글 보기</span>
                <FaArrowRight className="-rotate-45 transition-all transform group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </Content>

      <section
        className={cn(
          "w-full py-32 bg-neutral-100 mt-24 dark:bg-neutral-900/50"
        )}
      >
        <Content>
          <h3 className="font-extrabold text-2xl mb-4">Featured Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(await getFeaturedPostMeta()).map(async (p, i) => {
              const { meta, post } = p;
              return (
                <Link href={`/posts/${post}`} key={i}>
                  <PostPreview meta={meta} />
                </Link>
              );
            })}
          </div>
        </Content>
      </section>

      <section className="w-full py-32">
        <Content>
          <h3 className="font-extrabold text-2xl mb-4">Recent Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(await getRecentPostMeta(6)).map((p, i) => {
              const { meta, post } = p;
              return (
                <Link href={`/posts/${post}`} key={i}>
                  <PostPreview meta={meta} />
                </Link>
              );
            })}
          </div>
        </Content>
      </section>
    </>

    /*
    <div className="my-16">
      <div className="text-center my-16 flex justify-center">
        <h1
          className={cn(
            "font-bold text-3xl text-neutral-800 dark:text-neutral-100",
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
    */
  );
}
