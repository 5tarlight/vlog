import PostBody from "@/components/post/PostBody";
import TableOfContent from "@/components/post/TableOfContent";
import PsSidebar from "@/components/ps-guide/PsSidebar";
import { buildCoverUrl, parsePost, parseToc, toHtml } from "@/lib/post/parser";
import { psGuide, readContent } from "@/lib/post/posts";
import { getReadingTime } from "@/lib/post/readingTime";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return psGuide.map((post) => ({
    slug: post.split("/").slice(-1)[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  if (!psGuide.includes("ps/" + slug)) {
    return {
      title: "Not Found",
      description: "Not Found",
      applicationName: "YEAHx4 BLOG",
      keywords: [],
    };
  }

  const content = await readContent("ps/" + slug);
  const { meta } = parsePost(content);

  return {
    title: meta.title || "Not Found",
    description: meta.description,
    applicationName: "YEAHx4 BLOG",
    keywords: meta.tags,
    openGraph: {
      title: meta?.title,
      images: {
        url: meta.cover
          ? `https://post.yeahx4.me/img/cover/${meta.cover}`
          : buildCoverUrl(meta),
        alt: "YEAHx4",
        width: 700,
        height: 350,
      },
      type: "article",
      authors: ["YEAHx4"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yeahx44",
      images: {
        url: meta.cover
          ? `https://post.yeahx4.me/img/cover/${meta.cover}`
          : buildCoverUrl(meta),
        alt: "YEAHx4",
        width: 1280,
        height: 720,
      },
    },
  };
}

export default async function PsGuide({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!psGuide.includes("ps/" + slug)) {
    notFound();
  }

  const content = await readContent("ps/" + slug);
  const toc = parseToc(content);
  const { body, meta } = parsePost(content);

  return (
    <div className="flex justify-center mt-24 gap-8">
      <div className="max-w-64 w-full hidden 2xl:block">
        <PsSidebar />
      </div>
      <div className="max-w-3xl w-full px-4">
        <PostBody
          body={toHtml(body)}
          meta={meta}
          readingTime={getReadingTime(meta.bodyLength)}
        />
      </div>
      <div className="max-w-64 w-full hidden lg:block">
        <TableOfContent toc={toc} />
      </div>
    </div>
  );
}
