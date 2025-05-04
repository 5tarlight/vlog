import { getAllPsGuideMetaWithId } from "@/lib/post/posts";
import Link from "next/link";

export default async function PsSidebar() {
  const psPosts = await getAllPsGuideMetaWithId();

  return (
    <aside className="w-full max-w-[300px] flex-none hidden lg:block">
      <div className="sticky top-24 w-full h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="flex flex-col gap-4">
          {psPosts.map((post) => (
            <Link
              key={post.id}
              href={`/ps-guide/${post.id}`}
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {post.meta.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
