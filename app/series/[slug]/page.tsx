import Content from "@/components/Content";
import PostPreview from "@/components/PostPreview";
import { parsePost } from "@/lib/post/parser";
import { getPostsBySeries, readContent, series } from "@/lib/post/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { slug } = params;

  const seriesData = series[slug];

  if (!seriesData) {
    return {
      title: "Not Found",
      description: "Not Found",
    };
  }

  return {
    title: seriesData.name + " | 시리즈",
    description: seriesData.description,
  };
}

export default async function Series(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { slug } = params;

  if (!series[slug]) {
    notFound();
  }

  return (
    <Content className="mt-32">
      <div className="text-center mb-20">
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
          {series[slug].name}
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-neutral-600 dark:text-neutral-400">
          {series[slug].description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {(
          await Promise.all(
            getPostsBySeries(slug).map(async (post) => {
              const meta = parsePost(await readContent(post)).meta;
              return { meta, post };
            })
          )
        ).map(({ meta, post }, i) => (
          <div
            key={i}
            className="w-full max-w-sm p-2 rounded-xl transition-transform hover:scale-[1.025]"
          >
            <Link href={`/posts/${post}`}>
              <PostPreview meta={meta} />
            </Link>
          </div>
        ))}
      </div>
    </Content>
  );
}
