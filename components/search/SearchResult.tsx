import { postMetas } from "@/api/postMeta";
import { series } from "@/api/series";
import PostBlock from "../post/PostBlock";

export default function SearchResult({ search }: { search: string }) {
  const postResult = postMetas.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );
  const seriesResult = series.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mt-16">
        <h3>포스트 검색 결과</h3>
        <div className="flex flex-wrap justify-center">
          {postResult.length > 0
            ? postResult.map((post) => (
                <PostBlock
                  key={post.id}
                  href={`/post/${post.identifier}`}
                  title={post.title}
                  cover={post.cover}
                />
              ))
            : "검색 결과가 없습니다."}
        </div>
      </div>
      <div className="mt-16">
        <h3>시리즈 검색 결과</h3>
        <div className="flex flex-wrap justify-center">
          {seriesResult.length > 0
            ? seriesResult.map((series) => (
                <PostBlock
                  key={series.id}
                  href={`/series/${series.id}`}
                  title={series.name}
                />
              ))
            : "검색 결과가 없습니다."}
        </div>
      </div>
    </div>
  );
}
