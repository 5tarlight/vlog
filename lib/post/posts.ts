import { readFile } from "fs/promises";
import path from "path";
import { isDev } from "../utils/isDev";
import { parsePost } from "./parser";

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
    posts: ["blog-structure", "theme", "rendering"],
  },
};

const posts = [
  "test",
  "math/vector-function",
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

export const readlAllPosts = async () => {
  console.warn("Reading all posts");
  return await Promise.all(posts.map(readContent));
};

export const getAllMeta = async () => {
  return (await readlAllPosts()).map((content) => parsePost(content).meta);
};

export const getPostsBySeries = (seriesName: string) => {
  return series[seriesName].posts.map((post) => `${seriesName}/${post}`);
};

export const getPostsByTag = async (tag: string) => {
  return (await readlAllPosts()).filter((post) =>
    parsePost(post).meta.tags.includes(tag)
  );
};

export const getPostMeta = async (slug: string) => {
  return parsePost(await readContent(slug)).meta;
};

export const getPrevNextPosts = (series: string, index: number) => {
  const posts = getPostsBySeries(series);
  const prev = posts[index - 1];
  const next = posts[index + 1];

  return {
    prev: prev || null,
    next: next || null,
  };
};

export const getRecentPostMeta = async (cnt: number) => {
  const meta = posts.map(async (post) => {
    const content = await readContent(post);
    return {
      meta: parsePost(content).meta,
      post,
    };
  });

  return (await Promise.all(meta.slice(0, cnt))).reverse();
};
