import * as fs from "fs";

export const path = "./post";
export const folders = fs.readdirSync(path);
export const posts = folders
  .map((f) => fs.readdirSync(`${path}/${f}`, "utf-8"))
  .filter((it) => it.length > 0);
