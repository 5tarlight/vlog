import Content from "@/components/Content";
import PostPageNavigation from "@/components/post-whole/PostPageNavigation";
import PostSeparator from "@/components/post-whole/PostSeparator";
import PostSummary from "@/components/post-whole/PostSummary";
import { getMaxPage, getPostsByPage, series } from "@/lib/post/posts";
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
    <Content className="mt-24" small>
      <h1 className="text-4xl mt-8 font-extrabold">Posts</h1>

      <PostSeparator className="mt-4 mb-16" bold />

      <div className="flex gap-8 flex-col mb-16">
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

      <PostSeparator bold className="mb-8" />

      <PostPageNavigation page={page} maxPage={maxPage} />
    </Content>
  );
}
