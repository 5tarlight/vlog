import { getPost } from "@/api/posts";

export default function Post({ params }: { params: { postid: string } }) {
  const post = getPost(params.postid);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1024px] w-full">
        <h1 className="text-center">Post {params.postid}</h1>
        <div>{JSON.stringify(post)}</div>
      </div>
    </div>
  );
}
