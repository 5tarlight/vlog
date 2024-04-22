import { postMetas } from "@/api/postMeta";
import PostBlock from "@/components/post/PostBlock";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[1024px] w-full">
        <h1 className="text-center mb-16">YEAHx4 Blog</h1>
        <div>
          <h2>최신 포스트</h2>
          <div className="flex flex-wrap">
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
        <div>
          <h2>시리즈로 보기</h2>
        </div>
      </div>
    </div>
  );
}
