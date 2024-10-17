import { postExists, readContent } from "@/lib/post/posts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(reqeust: NextRequest) {
  try {
    const { path } = (await reqeust.json()) as { path: string };

    if (!postExists(path)) {
      return NextResponse.json({ message: "Not Found", path });
    }

    return NextResponse.json({
      message: "Ok",
      path,
      content: await readContent(path),
    });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}
