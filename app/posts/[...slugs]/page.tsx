import { getUrl } from "@/lib/utils/getUrl";
import { parsePost, parseToc, PostMeta } from "@/lib/post/parser";
import TableOfContent from "@/components/post/TableOfContent";
import PostBody from "@/components/post/PostBody";
import { getPost } from "@/lib/post/posts";

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

  const toc = parseToc(data.content);
  const { content: body, frontmatter: meta } = await getPost(data.content);

  return (
    <div className="flex justify-center gap-8">
      <PostBody
        body={body}
        meta={meta}
        readingTime={Math.ceil(data.content.length / 200)}
      />
      <TableOfContent toc={toc} />
    </div>
  );
}
