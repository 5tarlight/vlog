import { getPostsInSeries, getSeries } from "@/api/series";
import Link from "next/link";

const PostSeries = ({ series }: { series?: number }) => {
  if (series === undefined) return null;

  const seriesMeta = getSeries(series)!!;

  return (
    <div>
      <h4>
        <strong>{seriesMeta.name}</strong>
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
