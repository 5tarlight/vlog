import { buildCoverUrl, parsePost, parseToc, toHtml } from "@/lib/post/parser";
import TableOfContent from "@/components/post/TableOfContent";
import PostBody from "@/components/post/PostBody";
import { posts, readContent } from "@/lib/post/posts";
import { notFound } from "next/navigation";
import { getReadingTime } from "@/lib/post/readingTime";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slugs: post.split("/"),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slugs: string[] }>;
}) {
  const params = await props.params;
  const { slugs } = params;
  const path = slugs.join("/");

  if (!posts.includes(path)) {
    return {
      title: "Not Found",
      description: "Not Found",
      applicationName: "YEAHx4 BLOG",
      keywords: [],
    };
  }

  const content = await readContent(path);
  const { meta: post } = parsePost(content);

  return {
    title: post.title || "Not Found",
    description: post.description,
    applicationName: "YEAHx4 BLOG",
    keywords: post.tags,
    openGraph: {
      title: post?.title,
      images: {
        url: post.cover
          ? `https://post.yeahx4.me/img/cover/${post.cover}`
          : buildCoverUrl(post),
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
        url: post.cover
          ? `https://post.yeahx4.me/img/cover/${post.cover}`
          : buildCoverUrl(post),
        alt: "YEAHx4",
        width: 1280,
        height: 720,
      },
    },
  };
}

export default async function Post(props: {
  params: Promise<{ slugs: string[] }>;
}) {
  const params = await props.params;
  const { slugs } = params;

  if (!posts.includes(slugs.join("/"))) {
    notFound();
  }

  const content = await readContent(slugs.join("/"));

  const toc = parseToc(content);
  const { body, meta } = parsePost(content);

  return (
    <div className="flex justify-center mt-24 gap-8">
      <div className="max-w-64 w-full hidden 2xl:block" />
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
