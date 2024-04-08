import { getPost } from "@/api/posts";
import PostHead from "@/components/post/PostHead";

export default function Post({ params }: { params: { postid: string } }) {
  const post = getPost(params.postid);

  if (!post) return <div>Not Found</div>;

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1024px] w-full">
        <PostHead
          title={post.meta.title}
          date={post.meta.date}
          series={post.meta.series || undefined}
          description={post.meta.description}
        />
        <div>
          {post.content.split("\n").map((it, i) => (
            <div key={i}>{it}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
