import { folders, posts } from "@/api/posts";

export default function Post({ params }: { params: { postid: string } }) {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1024px] w-full">
        <h1 className="text-center">Post {params.postid}</h1>
        <div>Folders : {folders.join(", ")}</div>
        <div>Posts : {posts.join(", ")}</div>
      </div>
    </div>
  );
}
