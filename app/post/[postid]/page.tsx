import { getPost } from "@/api/posts";
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
  return {
    title: getPost(postid)?.meta.title || "Not Found",
    description: getPost(postid)?.meta.description,
    applicationName: "YEAHx4 BLOG",
    category: "blog",
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
        />
        <div>
          <PostBody
            content={post.content}
            series={post.meta.series?.id}
            postid={post.meta.id}
          />
        </div>
      </div>
    </div>
  );
}
