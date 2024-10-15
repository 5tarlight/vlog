import { getUrl } from "@/lib/getUrl";

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
    const errorText = await res.text(); // 오류 메시지를 텍스트로 출력
    console.error("Fetch error:", res.status, res.statusText);
    console.error("Response body:", errorText);
    throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return (
    <div>
      <h1>Post: {slugs.join("/")}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
