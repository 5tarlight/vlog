import { getUrl } from "@/lib/getUrl";

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

  // console.log(res);
  const data = await res.json();

  return (
    <div>
      <h1>Post: {slugs.join("/")}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
