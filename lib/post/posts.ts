import { readFile } from "fs/promises";
import path from "path";
import { isDev } from "../utils/isDev";

export const series: {
  [key: string]: {
    name: string;
    description: string;
    posts: string[];
  };
} = {
  "make-blog": {
    name: "Next.js 블로그 만들기",
    description: "Next.js 14로 블로그를 만듭니다.",
    posts: ["blog-structure", "theme"],
  },
};

const posts = [
  "test",
  ...Object.keys(series).flatMap((key) =>
    series[key].posts.map((post) => `${key}/${post}`)
  ),
];

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
