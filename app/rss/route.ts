import { parsePost } from "@/lib/post/parser";
import { posts, psGuide, readContent } from "@/lib/post/posts";
import { NextResponse } from "next/server";

async function getRss() {
  const items = [
    ...(await Promise.all(
      posts.map(async (post) => {
        const meta = parsePost(await readContent(post)).meta;

        return `\n      <item>
        <title><![CDATA[${meta.title}]]></title>
        <link>https://post.yeahx4.me/posts/${post}</link>
        <pubDate>${new Date(meta.update).toUTCString()}</pubDate>
        <description><![CDATA[${meta.description}]]></description>
      </item>\n\n`;
      })
    )),
    ...(await Promise.all(
      psGuide.map(async (post) => {
        const meta = parsePost(await readContent(post)).meta;

        return `\n      <item>
        <title><![CDATA[${meta.title}]]></title>
        <link>https://post.yeahx4.me/ps-guide/${post.split("/")[1]}</link>
        <pubDate>${new Date(meta.update).toUTCString()}</pubDate>
        <description><![CDATA[${meta.description}]]></description>
      </item>\n\n`;
      })
    )),
  ];

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>YEAHx4 Blog</title>
      <link>https://post.yeahx4.me</link>
      <description>YEAHx4 Blog RSS</description>
      <language>ko</language>
${items.join("")}     </channel>
  </rss>`;
}

export async function GET() {
  const rssFeed = await getRss();
  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
