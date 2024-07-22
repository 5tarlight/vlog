import { readFileSync } from "fs";
import { sync } from "glob";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";
import readingTime from "reading-time";

export const POST_BASE_PATH = "/posts";
export const POST_PATH = path.join(process.cwd(), POST_BASE_PATH);

let posts: Post[] | null = null;

export const isDev = process.env.NODE_ENV === "development";

export const getAllPosts = () => {
  if (posts && !isDev) {
    return posts;
  }

  const path = sync(`${POST_PATH}/**/*.mdx`);
  posts = path.reduce<Post[]>((acc, postPath) => {
    const post = parsePost(postPath);
    if (!post) return acc;
    return [...acc, post];
  }, []);

  return posts;
};

export type PostMatter = {
  title: string;
  description: string;
  tags: string[];
  draft?: boolean;
  series?: string;
  seriesIndex?: number;
  date: string;
};

export type Post = PostMatter & {
  slug: string;
  content: string;
  readingMinutes: number;
  wordCount: number;
};

export const parsePost = (path: string): Post | undefined => {
  try {
    const file = readFileSync(path, { encoding: "utf-8" });
    const { content, data } = matter(file);
    const grayMatter = data as PostMatter;

    if (grayMatter.draft) return undefined;

    return {
      ...grayMatter,
      tags: grayMatter.tags
        .map((it) => it.split(", ").map((it) => it.trim()))
        .flat()
        .filter((tag) => tag),
      date: dayjs(grayMatter.date).format("YYYY-MM-DD HH:mm:ss"),
      content,
      slug: path
        .slice(POST_PATH.length + 1)
        .replace(".mdx", "")
        .toLowerCase(),
      readingMinutes: Math.ceil(readingTime(content).minutes),
      wordCount: content.split(/\s+/g).length,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getRecentPosts = (count: number) => {
  return getAllPosts()
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
    .slice(0, count);
};

export const getPrevPost = (series: string, index: number) => {
  return getAllPosts().find(
    (post) => post.series === series && post.seriesIndex === index - 1
  );
};

export const getNextPost = (series: string, index: number) => {
  return getAllPosts().find(
    (post) => post.series === series && post.seriesIndex === index + 1
  );
};
