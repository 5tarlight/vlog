import { getUrl } from "@/lib/utils/getUrl";
import { parsePost, parseToc, toHtml } from "@/lib/post/parser";
import TableOfContent from "@/components/post/TableOfContent";
import PostBody from "@/components/post/PostBody";

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
        readingTime={Math.ceil(body.join("\n").length / 200)}
      />
      <TableOfContent toc={toc} />
    </div>
  );
}
