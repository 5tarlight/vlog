import { getPost } from "@/api/posts";
import PostBody from "@/components/post/PostBody";
import PostHead from "@/components/post/PostHead";

export default function Post({ params }: { params: { postid: string } }) {
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
