import * as fs from "fs";
import { PostMeta, postMetas } from "./postMeta";
import { series } from "./series";

export const path = "./post";
export const folders = fs.readdirSync(path);
export const posts = folders
  .map((f) => fs.readdirSync(`${path}/${f}`, "utf-8"))
  .filter((it) => it.length > 0);

export interface Post {
  meta: PostMeta;
  content: string;
}

export const getPost = (identifier: string) => {
  const meta = postMetas.find((it) => it.identifier === identifier);

  if (!meta) return null;
  const seriresMeta =
    meta.series != undefined
      ? series.find((s) => s.id === meta.series) || null
      : null;
  const content = fs.readFileSync(`${path}/${meta.path}`, "utf-8");

  return {
    meta: {
      ...meta,
      series: seriresMeta,
    },
    content,
  };
};
