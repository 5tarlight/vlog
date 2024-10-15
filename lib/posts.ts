import { readFile } from "fs/promises";
import path from "path";

const posts = ["test"];

export const POST_BASE_PATH = "/posts";
export const POST_PATH = path.join(process.cwd(), POST_BASE_PATH);

const getPostUrl = (slug: string) => path.join(POST_PATH, `${slug}.mdx`);

export const postExists = (slug: string) => {
  console.log("postExists", slug, posts.includes(slug));
  return posts.includes(slug);
};

export const readContent = async (slug: string) => {
  return await readFile(getPostUrl(slug), "utf-8");
};
