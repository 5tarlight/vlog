import { getPostsInSeries, getSeries } from "@/api/series";
import Link from "next/link";

const PostSeries = ({ series }: { series?: number }) => {
  if (series === undefined) return null;

  const seriesMeta = getSeries(series)!!;

  return (
    <div className="w-[calc((100% - 700px) / 2]">
      <h4>
        <b>{seriesMeta.name}</b>
      </h4>
      {getPostsInSeries(series).map((post) => (
        <div key={post.identifier}>
          <Link href={`/post/${post.identifier}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default PostSeries;
