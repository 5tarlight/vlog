import { parsePost } from "@/lib/post/parser";
import { posts, psGuide, readContent, series } from "@/lib/post/posts";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://post.yeahx4.me";
  const makeUrl = (loc: string) => `${baseUrl}/${loc}`;

  return [
    { url: baseUrl, lastModified: new Date() },
    ...(await Promise.all(
      posts
        .map(async (post) => ({
          post,
          meta: parsePost(await readContent(post)).meta,
        }))
        .map(async (p) => {
          const { post, meta } = await p;
          return {
            url: makeUrl(`posts/${post}`),
            lastModified: new Date(meta.update),
          };
        })
    )),
    ...(await Promise.all(
      psGuide
        .map(async (post) => ({
          post,
          meta: parsePost(await readContent(post)).meta,
        }))
        .map(async (p) => {
          const { post, meta } = await p;
          return {
            url: makeUrl(`ps-guide/${post.split("/")[1]}`),
            lastModified: new Date(meta.update),
          };
        })
    )),
    ...Object.keys(series).map((s) => ({
      url: makeUrl(`series/${s}`),
      lastModified: "2025-03-18",
    })),
  ];
}
