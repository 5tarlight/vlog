import { sync } from "glob";
import path from "path";

export const POST_BASE_PATH = "/posts";
export const POST_PATH = path.join(process.cwd(), POST_BASE_PATH);

export const getAllPosts = () => {
  const path = sync(`${POST_PATH}/**/*.mdx`);
  return path.map((file) => {
    return {
      slug: file
        .slice(POST_PATH.length + 1)
        .replace(".mdx", "")
        .toLowerCase(),
    };
  });
};
