import { postExists, readContent } from "@/lib/posts";
import { NextRequest } from "next/server";

export async function POST(reqeust: NextRequest) {
  try {
    const { path } = (await reqeust.json()) as { path: string };

    if (!postExists(path)) {
      return Response.json({ message: "Not Found", path }, { status: 404 });
    }

    return Response.json({
      message: "Ok",
      path,
      content: await readContent(path),
    });
  } catch (e) {
    return Response.json({ e }, { status: 500 });
  }
}
