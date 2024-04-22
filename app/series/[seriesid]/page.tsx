import { getImage } from "@/api/imageCdn";
import { postMetas } from "@/api/postMeta";
import { series } from "@/api/series";
import PostBlock from "@/components/post/PostBlock";

export default function Series({ params }: { params: { seriesid: string } }) {
  const s = series.find((s) => "" + s.id === params.seriesid);

  if (!s) {
    return (
      <div className="flex justify-center">
        <div className="max-w-[1024px] w-full">
          <h1 className="text-center">시리즈를 찾을 수 없습니다</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-[1024px] w-full">
        <h1>{s.name}</h1>
        <div className="mt-16 flex flex-wrap">
          {postMetas
            .filter((it) => it.series === s.id)
            .map((post, i) => (
              <PostBlock
                title={post.title}
                href={`/post/${post.identifier}`}
                cover={post.cover}
                key={i}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
