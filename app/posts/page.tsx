import PostSummary from "@/components/post-whole/PostSummary";
import { getPostsByPage, series } from "@/lib/post/posts";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ page: number | undefined }>;
}) {
  const params = await searchParams;

  if (!params.page) {
    redirect("/posts?page=1");
  }

  const page = params.page;
  const meta = await getPostsByPage(page, 5);

  return (
    <div className="max-w-5xl w-full mx-auto">
      <h1 className="text-center text-4xl mt-8 font-extrabold">전체 글</h1>

      <div className="flex gap-4 flex-col my-16">
        {meta.map((m, i) => (
          <Link href={`/posts/${m.id}`} key={i}>
            <PostSummary
              meta={m.meta}
              seriesName={m.meta.series && series[m.meta.series].name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
