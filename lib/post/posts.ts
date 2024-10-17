import { readFile } from "fs/promises";
import path from "path";
import { isDev } from "../utils/isDev";
import { PostMeta } from "./parser";

const posts = ["test"];

const cache = new Map<string, string>();

export const POST_BASE_PATH = "/posts";
export const POST_PATH = path.join(process.cwd(), POST_BASE_PATH);

const getPostUrl = (slug: string) => path.join(POST_PATH, `${slug}.mdx`);

export const postExists = (slug: string) => {
  return posts.includes(slug);
};

export const readContent = async (slug: string) => {
  if (!isDev && cache.has(slug)) {
    return cache.get(slug) || "Unabled to read content";
  }

  console.log(
    "Reading file:",
    getPostUrl(slug),
    "Current cache length:",
    cache.size
  );
  const content = await readFile(getPostUrl(slug), "utf-8");
  cache.set(slug, content);

  return content;
};

// export const getPost = async (original: string) => {
//   return await compileMDX<PostMeta>({
//     source: original,
//     options: {
//       parseFrontmatter: true,
//       mdxOptions: {
//         remarkPlugins: [],
//         rehypePlugins: [],
//       },
//     },
//   });
// };
