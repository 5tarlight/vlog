import { parsePost } from "@/lib/post/parser";
import { getPostsBySeries, readContent } from "@/lib/post/posts";
import SeriesListContent from "./SeriesListContent";
import { series as seriesData } from "@/lib/post/posts";

export default async function SeriesList({
  series,
  current,
}: {
  series: string;
  current: number;
}) {
  const seriesPosts = await Promise.all(
    getPostsBySeries(series).map(async (post) => ({
      meta: parsePost(await readContent(post)).meta,
      post,
    }))
  );

  return (
    <SeriesListContent
      seriesPosts={seriesPosts}
      current={current}
      seriesName={seriesData[series].name}
    />
  );
}
