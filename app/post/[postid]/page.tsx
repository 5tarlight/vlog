import { getImage } from "@/api/imageCdn";
import { getPost } from "@/api/posts";
import Comment from "@/components/comment/Comment";
import PostBody from "@/components/post/PostBody";
import PostHead from "@/components/post/PostHead";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { postid: string };
}

export async function generateMetadata(
  { params: { postid } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPost(postid);

  return {
    title: post?.meta.title || "Not Found",
    description: post?.meta.description,
    applicationName: "YEAHx4 BLOG",
    category: "blog",
    keywords: post?.meta.tags,
    openGraph: {
      title: post?.meta.title,
      images: {
        url: getImage(post?.meta.cover || "thumbnail/yeahx4.png"),
        alt: "YEAHx4",
        width: post?.meta.coverWidth || 1280,
        height: post?.meta.coverHeight || 720,
      },
      type: "article",
      authors: ["YEAHx4"],
    },
  };
}

export default function Post({ params }: Props) {
  const post = getPost(params.postid);

  // TODO : pretty 404 page
  if (!post) return <div className="text-center">Not Found</div>;

  return (
    <div className="w-full flex justify-center">
      <div className="lg:w-[1300px] w-[700px]">
        <PostHead
          title={post.meta.title}
          date={post.meta.date}
          series={post.meta.series || undefined}
          description={post.meta.description}
          tags={post.meta.tags}
          timeToRead={Math.round(post.content.split(" ").length / 100) + " min"}
        />
        <div>
          <PostBody
            content={post.content}
            series={post.meta.series?.id}
            postid={post.meta.id}
          />
        </div>
        <div className="h-16" />
        <Comment />
      </div>
    </div>
  );
}
