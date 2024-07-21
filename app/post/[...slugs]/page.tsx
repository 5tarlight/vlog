import Content from "@/components/Content";
import PostContent from "@/components/PostContent";
import { serializeMdx } from "@/libs/mdx";
import { getAllPosts } from "@/libs/posts";
import { notFound } from "next/navigation";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import Comment from "@/components/Comment";
import Tag from "@/components/Tag";

export async function generateMetadata({
  params: { slugs },
}: {
  params: { slugs: string[] };
}) {
  const post = getAllPosts().find(
    (post) => post.slug.toLowerCase() === slugs.join("/").toLowerCase()
  );

  return {
    title: post?.title || "Not Found",
    description: post?.description,
    applicationName: "YEAHx4 BLOG",
    category: "blog",
    keywords: post?.tags,
    openGraph: {
      title: post?.title,
      // images: {
      //   url: getImage(post?.meta.cover || "thumbnail/yeahx4bg.png"),
      //   alt: "YEAHx4",
      //   width: post?.meta.coverWidth || 1280,
      //   height: post?.meta.coverHeight || 720,
      // },
      type: "article",
      authors: ["YEAHx4"],
    },
  };
}

export default async function Post({
  params,
}: {
  params: { slugs: string[] };
}) {
  const { slugs } = params;
  const posts = getAllPosts();
  const post = posts.find(
    (post) => post.slug.toLowerCase() === slugs.join("/").toLowerCase()
  );

  if (!post) {
    notFound();
  }

  // const mdx = serializeMdx(post.content);

  return (
    <Content>
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        {post.series && (
          <a className="series" href={`/series/${post.series}`}>
            {post.series}
          </a>
        )}
        <div className="flex">
          <div className="post-date">
            <CiCalendar /> <span>{post.date.split(" ")[0]}</span>
          </div>
          <div className="time-to-read">
            <CiClock2 /> <span>{post.readingMinutes}분</span>
          </div>
        </div>
        <Tag>{post.tags}</Tag>
      </div>
      <div>
        <PostContent mdx={post.content} />
      </div>
      <Comment />
    </Content>
  );
}
