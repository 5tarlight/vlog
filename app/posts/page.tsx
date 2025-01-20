import PostPageNavigation from "@/components/post-whole/PostPageNavigation";
import PostSummary from "@/components/post-whole/PostSummary";
import { renderLine } from "@/lib/post/parser";
import {
  getContentPreview,
  getMaxPage,
  getPostsByPage,
  series,
} from "@/lib/post/posts";
import { isNumeric } from "@/lib/utils/isNumeric";
import { redirect } from "next/navigation";

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined }>;
}) {
  const params = await searchParams;

  if (!params.page || !isNumeric(params.page)) {
    redirect("/posts?page=1");
  }

  const PAGE_SIZE = 5;
  const page = parseInt(params.page);
  const meta = await getPostsByPage(page, PAGE_SIZE);
  const maxPage = await getMaxPage(PAGE_SIZE);

  if (page > maxPage) {
    redirect(`/posts?page=${maxPage}`);
  }

  return (
    <div className="max-w-5xl w-full mx-auto">
      <h1 className="text-center text-4xl mt-8 font-extrabold">전체 글</h1>

      <div className="flex gap-6 flex-col my-16">
        {meta.map(async (m, i) => (
          <PostSummary
            key={i}
            id={m.id}
            meta={m.meta}
            seriesName={m.meta.series && series[m.meta.series].name}
            // content={renderLine(await getContentPreview(m.id))}
            // content={await getContentPreview(m.id)}
          />
        ))}
      </div>

      <PostPageNavigation page={page} maxPage={maxPage} />
    </div>
  );
}
