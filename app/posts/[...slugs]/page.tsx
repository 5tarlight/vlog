import { getUrl } from "@/lib/utils/getUrl";
import { parsePost, parseToc } from "@/lib/post/parser";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

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
  const { body, meta } = parsePost(data.content);

  // To disable eslint: unused-vars
  console.log(meta);

  return (
    <div className="flex justify-center gap-8">
      <div
        className={cn(
          "max-w-[678px] w-full bg-white p-8 rounded-md shadow-md",
          "dark:bg-gray-800 dark:text-white"
        )}
      >
        {body.map((block, idx) => (
          <div key={idx}>{block}</div>
        ))}
      </div>
      <div
        className={cn(
          "hidden md:block w-[480px] bg-white dark:bg-gray-800",
          "sticky top-28 h-fit p-8 rounded-md shadow-md border-l-8",
          "border-white hover:border-gray-300 transition-all",
          "hover:rounded-l-none dark:border-gray-800 dark:hover:border-gray-500"
        )}
      >
        <div className="mb-8 font-bold text-center">Table of Content</div>
        <ul className="flex flex-col gap-2">
          {toc.map((tocItem, idx) => (
            <li
              key={idx}
              className={cn(
                "relative pl-4 text-gray-700 hover:font-bold hover:text-blue-600",
                "transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400"
              )}
              style={{
                marginLeft: `${tocItem.level * 1}rem`,
              }}
            >
              <Link
                href={`#${tocItem.value}`}
                className={cn(
                  "before:absolute before:left-0 before:top-1/2 before:w-2",
                  "before:h-2 before:bg-blue-300 before:rounded-full",
                  "before:-translate-y-1/2 dark:before:bg-blue-700",
                  "before:w-1 before:h-1"
                )}
              >
                {tocItem.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
