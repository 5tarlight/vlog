import { getAllPsGuideMetaWithId } from "@/lib/post/posts";
import PsSidebarLink from "./PsSidebarLink";
import cn from "@yeahx4/cn";

export default async function PsSidebar() {
  const psPosts = await getAllPsGuideMetaWithId();

  return (
    <aside
      className={cn(
        "hidden lg:block w-[240px] flex-none h-screen px-2",
        "overflow-y-auto"
      )}
    >
      <h2
        className={cn(
          "text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4"
        )}
      >
        알고리즘 가이드
      </h2>
      <nav className="flex flex-col">
        {psPosts.map((post) => (
          <PsSidebarLink key={post.id} id={post.id} title={post.meta.title} />
        ))}
      </nav>
    </aside>
  );
}
