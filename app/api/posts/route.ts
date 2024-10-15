import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { NextRequest } from "next/server";

function postExists(slug: string) {
  if (existsSync(`./posts/${slug}.mdx`)) {
    return true;
  } else {
    return false;
  }
}

async function readContent(slug: string) {
  return await readFile(`./posts/${slug}.mdx`, "utf-8");
}

export async function POST(reqeust: NextRequest) {
  const { path } = (await reqeust.json()) as { path: string };

  if (!postExists(path)) {
    return Response.json({ message: "Not Found", path }, { status: 404 });
  }

  return Response.json({
    message: "Ok",
    path,
    content: await readContent(path),
  });
}
