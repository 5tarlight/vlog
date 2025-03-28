import { getStaticUrl, getUrl } from "@/lib/utils/getUrl";
import { buildCoverUrl, parsePost, parseToc, toHtml } from "@/lib/post/parser";
import TableOfContent from "@/components/post/TableOfContent";
import PostBody from "@/components/post/PostBody";

export async function generateMetadata(props: {
  params: Promise<{ slugs: string[] }>;
}) {
  const params = await props.params;
  const { slugs } = params;

  const res = await fetch(await getUrl("/api/posts"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path: slugs.join("/") }),
  });

  const data: {
    message: string;
    path: string;
    content: string;
  } = await res.json();

  if (data.message === "Not Found") {
    return {
      title: "Not Found",
      description: "Not Found",
      applicationName: "YEAHx4 BLOG",
      keywords: [],
    };
  }

  const { meta: post } = parsePost(data.content);

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

export async function generateStaticParams() {
  const res = await fetch(getStaticUrl("/api/posts"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: { message: string; posts: string[] } = await res.json();

  if (data.message === "Not Found") {
    return [];
  }

  return data.posts.map((post) => ({
    slugs: post.split("/"),
  }));
}

export default async function Post(props: {
  params: Promise<{ slugs: string[] }>;
}) {
  const params = await props.params;

  const { slugs } = params;

  const res = await fetch(await getUrl("/api/posts"), {
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

  if (data.message === "Not Found") {
    return <div>Not Found: {data.path}</div>;
  }

  const toc = parseToc(data.content);
  const { body, meta } = parsePost(data.content);

  return (
    <div className="flex justify-center gap-8">
      <div className="max-w-64 w-full hidden xl:block" />
      <div className="max-w-4xl w-full">
        <PostBody
          body={toHtml(body)}
          meta={meta}
          readingTime={Math.round(body.join("\n").length / 600)}
        />
      </div>
      <div className="max-w-64 w-full hidden lg:block">
        <TableOfContent toc={toc} />
      </div>
    </div>
  );
}
