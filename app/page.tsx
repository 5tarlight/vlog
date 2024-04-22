import { postMetas } from "@/api/postMeta";
import { series } from "@/api/series";
import PostBlock from "@/components/post/PostBlock";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[1024px] w-full">
        <h1 className="text-center mb-16">YEAHx4 Blog</h1>
        <div>
          <h2>최신 포스트</h2>
          <div className="flex flex-wrap justify-center">
            {postMetas
              .slice(postMetas.length - 3)
              .map((post, i) => (
                <PostBlock
                  title={post.title}
                  href={`/post/${post.identifier}`}
                  cover={post.cover}
                  key={i}
                />
              ))
              .reverse()}
          </div>
        </div>
        <div className="mt-8">
          <h2>시리즈로 보기</h2>
          <div className="flex flex-wrap justify-center">
            {series
              .slice(Math.max(series.length - 3, 0))
              .map((s, i) => (
                <PostBlock title={s.name} href={`/series/${s.id}`} key={i} />
              ))
              .reverse()}
          </div>
        </div>

        <div className="mt-16">
          <h2>모든 포스트</h2>
          {
            <div className="flex flex-wrap justify-center">
              {postMetas
                .map((post, i) => (
                  <PostBlock
                    title={post.title}
                    href={`/post/${post.identifier}`}
                    cover={post.cover}
                    key={i}
                  />
                ))
                .reverse()}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
