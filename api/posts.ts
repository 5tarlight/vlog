import * as fs from "fs";
import { PostMeta, postMetas } from "./postMeta";
import { series } from "./series";

export const path =
  process.env.NODE_ENV == "production"
    ? process.cwd() + "/.next/post_md"
    : "./post";
// export const folders = fs.readdirSync(path);
// export const posts = folders
//   .map((f) => fs.readdirSync(`${path}/${f}`, "utf-8"))
//   .filter((it) => it.length > 0);

export interface Post {
  meta: PostMeta;
  content: string;
}

export const getPost = (identifier: string) => {
  console.log("Current dir : ", __dirname, __filename);
  console.log("root dir : ", process.cwd());
  console.log("files in root : ", fs.readdirSync(process.cwd() + "/.next"));
  console.log("files in post : ", path, fs.readdirSync(path));

  const meta = postMetas.find((it) => it.identifier === identifier);

  if (!meta) return null;
  const seriesMeta =
    meta.series != undefined
      ? series.find((s) => s.id === meta.series) || null
      : null;
  const content = fs.readFileSync(`${path}/${meta.path}`, "utf-8");

  return {
    meta: {
      ...meta,
      series: seriesMeta,
    },
    content,
  };
};
