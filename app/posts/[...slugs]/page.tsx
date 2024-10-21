import { getUrl } from "@/lib/utils/getUrl";
import { parsePost, parseToc, toHtml } from "@/lib/post/parser";
import TableOfContent from "@/components/post/TableOfContent";
import PostBody from "@/components/post/PostBody";

export async function generateMetadata({
  params: { slugs },
}: {
  params: { slugs: string[] };
}) {
  const res = await fetch(getUrl("/api/posts"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path: slugs.join("/") }),
  });

  const data: {
    message: string;
    path: string;
    content: string;
  } = await res.json();

  const { meta: post } = parsePost(data.content);

  return {
    title: post.title || "Not Found",
    description: post.description,
    applicationName: "YEAHx4 BLOG",
    keywords: post.tags,
    openGraph: {
      title: post?.title,
      images: {
        url: `https://post.yeahx4.me/img/cover/${post.cover}`,
        alt: "YEAHx4",
        width: 700,
        height: 350,
      },
      type: "article",
      authors: ["YEAHx4"],
    },
  };
}

export default async function Post({
  params: { slugs },
}: {
  params: { slugs: string[] };
}) {
  const res = await fetch(getUrl("/api/posts"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path: slugs.join("/") }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch error:", res.status, res.statusText);
    console.error("Response body:", errorText);
    throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
  }

  const data: {
    message: string;
    path: string;
    content: string;
  } = await res.json();

  if (data.message === "Not Found") {
    return <div>Not Found: {data.path}</div>;
  }

  const toc = parseToc(data.content);
  const { body, meta } = parsePost(data.content);

  return (
    <div className="flex justify-center gap-8">
      <PostBody
        body={toHtml(body)}
        meta={meta}
        readingTime={Math.round(body.join("\n").length / 600)}
      />
      <TableOfContent toc={toc} />
    </div>
  );
}
