import { getUrl } from "@/lib/getUrl";
import { parseToc } from "@/lib/parser";

export default async function Post({
  params: { slugs },
}: {
  params: { slugs: string[] };
}) {
  console.log("Target URL:", getUrl("/api/posts"));
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

  return (
    <div>
      <h1>Post: {slugs.join("/")}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h2>Table of Contents</h2>
      <pre>{JSON.stringify(toc, null, 2)}</pre>
    </div>
  );
}
