import Content from "@/components/Content";
import PostContent from "@/components/PostContent";
import { serializeMdx } from "@/libs/mdx";
import { getAllPosts } from "@/libs/posts";
import { notFound } from "next/navigation";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import Giscus from "@giscus/react";
import Comment from "@/components/Comment";

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

  const mdx = await serializeMdx(post.content);

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
            <CiCalendar /> <span>{post.date}</span>
          </div>
          <div className="time-to-read">
            <CiClock2 /> <span>{post.readingMinutes}분</span>
          </div>
        </div>
      </div>
      <div>
        <PostContent mdx={mdx} />
      </div>

      <Comment />
    </Content>
  );
}
