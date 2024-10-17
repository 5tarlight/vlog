import { readFile } from "fs/promises";
import path from "path";
import { isDev } from "../utils/isDev";

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
    return cache.get(slug);
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
