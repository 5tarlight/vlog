import { getAllPsGuideMetaWithId } from "@/lib/post/posts";
import Link from "next/link";
import Content from "@/components/Content";
import cn from "@yeahx4/cn";
import { prettifyDate } from "@/lib/utils/date";

export default async function PsGuide() {
  const psPosts = await getAllPsGuideMetaWithId();

  return (
    <Content small className="mt-24">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
        알고리즘 문제 해결 가이드
      </h1>
      <ul className="flex flex-col mt-2">
        {psPosts.map((post, index) => (
          <li key={post.id}>
            <Link
              href={`/ps-guide/${post.id.split("/")[1]}`}
              className={cn(
                "group flex items-center justify-between px-4 py-3 transition-all",
                "hover:bg-neutral-50 dark:hover:bg-neutral-800",
                "hover:translate-x-1"
              )}
            >
              <div className="text-sm text-neutral-800 dark:text-neutral-200">
                <span className="mr-2 text-neutral-400 dark:text-neutral-500">
                  {index + 1}.
                </span>
                <span className="font-semibold">{post.meta.title}</span>
                <span className="mx-2 text-neutral-400 dark:text-neutral-500">
                  –
                </span>
                <span className="text-neutral-600 dark:text-neutral-400">
                  {post.meta.description}
                </span>
              </div>
              <span
                className={cn(
                  "ml-4 shrink-0 text-xs text-neutral-400 font-mono",
                  "dark:text-neutral-500 sm:block hidden"
                )}
              >
                {prettifyDate(post.meta.date)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Content>
  );
}
