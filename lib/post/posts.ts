import { readFile } from "fs/promises";
import path from "path";
import { parsePost } from "./parser";
import { isDev } from "../utils/isDev";

const draft = (post: string[]) => {
  return isDev ? post : [];
};

export const series: {
  [key: string]: {
    name: string;
    description: string;
    posts: string[];
  };
} = {
  "make-blog": {
    name: "Next.js 블로그 만들기",
    description: "Next.js 15로 블로그를 만듭니다.",
    posts: [
      "blog-structure",
      "theme",
      "rendering",
      "open-graph",
      // , "search" -> KMP가 더 느렸음. 추가 연구, 수정 필요
      "vercel-og",
      "sitemap",
      "rss",
      "font-optimization",
      "posts-infinite-scroll",
      "posts-ssg",
      "mobile-optimization",
      ...draft([]),
    ],
  },
  "special-lectures": {
    name: "특강 시리즈",
    description: "특강을 듣고 정리한 포스트입니다.",
    posts: ["future-of-developers", "ideal-univ-life"],
  },
};

export const posts = [
  ...draft(["test"]),
  "math/vector-function",
  // "dev-blog-guideline", -> Low Quality
  "python/itertools",
  "web/react-abort-controller",
  "math/quaternion",
  "how-git-works",
  "web/temporal",
  "web/build-http-with-c",
  ...Object.keys(series).flatMap((key) =>
    series[key].posts.map((post) => `${key}/${post}`)
  ),
  ...draft([]),
];

export const featured = [
  "special-lectures/ideal-univ-life",
  "special-lectures/future-of-developers",
  "make-blog/vercel-og",
];

export const psGuide = [
  // "ps-test",
  "get-started",
  "time-complexity",
  "fastio",
  "array-vector",
  "brute-force",
  "modular-arithmetic",
  "sieve-of-eratosthenes",
  "euclidean-algorithm",
  "map-set",
  "sort",
  "stack-queue-deque",
  "recursion-backtracking",
  "dynamic-programming",
  "prefix-sum",
  "binary-search-parametric-search",
  "bitmasking",
  "graph-theory",
  "bfs",
  "dfs",
  "priority-queue",
  "exponentiation-by-squaring",
  "divide-and-conquer",
  "tree",
  "floyd-warshall",
  "dijkstra",
  ...draft(["bellman-ford"]),
].map((post) => `ps/${post}`);

export const POST_BASE_PATH = "/posts";
export const POST_PATH = path.join(process.cwd(), POST_BASE_PATH);

const getPostUrl = (slug: string) => path.join(POST_PATH, `${slug}.mdx`);

export const postExists = (slug: string) => {
  return posts.includes(slug);
};

export const readContent = async (slug: string) => {
  const content = await readFile(getPostUrl(slug), "utf-8");
  return content;
};

export const readAllPosts = async () => {
  console.warn("Reading all posts");
  return await Promise.all(posts.map(readContent));
};

export const readAllPsGuide = async () => {
  console.warn("Reading all ps-guide");
  return await Promise.all(psGuide.map(readContent));
};

export const getAllMeta = async () => {
  return (await readAllPosts()).map((content) => parsePost(content).meta);
};

export const getAllPsGuideMeta = async () => {
  return (await readAllPsGuide()).map((content) => parsePost(content).meta);
};

export const getContentPreview = async (slug: string) => {
  const content = await readContent(slug);
  const { body } = parsePost(content);

  let preview = "";
  let length = 0;
  const bannedPrefix = ["```", ">", "#", "-", "*"];

  for (let i = 0; i < body.length; i++) {
    if (
      !body[i] ||
      bannedPrefix.some((prefix) => body[i].trim().startsWith(prefix))
    )
      continue;

    preview += body[i] + " ";
    length += body[i].length;

    if (length > 100) break;
  }

  return preview;
};

export const getAllMetaWithId = async () => {
  return (await readAllPosts()).map((content, i) => ({
    meta: parsePost(content).meta,
    id: posts[i],
  }));
};

export const getAllPsGuideMetaWithId = async () => {
  return (await readAllPsGuide()).map((content, i) => ({
    meta: parsePost(content).meta,
    id: psGuide[i],
  }));
};

export const getPostsBySeries = (seriesName: string) => {
  return series[seriesName].posts.map((post) => `${seriesName}/${post}`);
};

export const getPostsByTag = async (tag: string) => {
  return (await readAllPosts()).filter((post) =>
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

export const getFeaturedPostMeta = async () => {
  const meta = featured.map(async (post) => {
    const content = await readContent(post);
    return {
      meta: parsePost(content).meta,
      post,
    };
  });

  return await Promise.all(meta);
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
    [...posts, ...psGuide].map(async (post) => {
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

export async function getPostsByPage(page: number, limit: number) {
  const sortedPosts = (await getAllMetaWithId()).sort(
    (a, b) => Date.parse(b.meta.date) - Date.parse(a.meta.date)
  );

  const start = (page - 1) * limit;
  const end = page * limit;

  return sortedPosts.slice(start, end);
}

export async function getMaxPage(limit: number) {
  return Math.ceil(posts.length / limit);
}
