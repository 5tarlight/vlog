import { getAllPosts } from "@/libs/posts";

export default function Post() {
  const posts = getAllPosts();
  return (
    <div>
      {
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`/post/${post.slug}`}>{post.slug}</a>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
