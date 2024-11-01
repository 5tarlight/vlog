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
    posts: [
      "blog-structure",
      "theme",
      "rendering",
      "open-graph",
      // , "search" -> KMP가 더 느렸음. 추가 연구, 수정 필요
      "vercel-og",
      "sitemap",
      "rss",
    ],
  },
};

export const posts = [
  "math/vector-function",
  // "dev-blog-guideline", -> Low Quality
  "python/itertools",
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

  return (await Promise.all(meta))
    .sort((a, b) => Date.parse(b.meta.date) - Date.parse(a.meta.date))
    .slice(0, cnt);
};

const countOccurrence = (str: string, query: string) => {
  return str.toLowerCase().split(query.toLowerCase()).length - 1;
  // return kmp(str, query);
};

export const searchPosts = async (query: string, limit = 6) => {
  const start = Date.now();

  const scores = await Promise.all(
    posts.map(async (post) => {
      const content = await readContent(post);
      const { meta, body } = parsePost(content);

      const titleScore = countOccurrence(meta.title.toLowerCase(), query);
      const descriptionScore = countOccurrence(
        meta.description.toLowerCase(),
        query
      );

      const bodyScoreRaw = countOccurrence(body.join(" ").toLowerCase(), query);
      const bodyLength = body.join(" ").length;
      const bodyScore = bodyLength > 0 ? (bodyScoreRaw / bodyLength) * 100 : 0;

      const tagScore = meta.tags.reduce(
        (acc, tag) => acc + countOccurrence(tag.toLowerCase(), query),
        0
      );

      const score =
        7 * titleScore + 5 * descriptionScore + bodyScore + 6 * tagScore;

      return {
        post: { meta, body, id: post },
        score,
      };
    })
  );

  const end = Date.now();
  console.log("Search took", end - start, "ms for", query);

  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter((it) => it.score > 0);
};
