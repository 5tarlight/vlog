import { parsePost } from "@/lib/post/parser";
import { posts, readContent } from "@/lib/post/posts";
import type { MetadataRoute } from "next";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://post.yeahx4.me";
  const makeUrl = (loc: string) => path.join(baseUrl, loc);

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
            url: makeUrl(post),
            lastModified: new Date(meta.update),
          };
        })
    )),
  ];
}
