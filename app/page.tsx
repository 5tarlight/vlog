import Content from "@/components/Content";
import PostPreview from "@/components/PostPreview";
import { getRecentPosts } from "@/libs/posts";

export default function Home() {
  return (
    <Content>
      <h1 className="title-recent-post">최신 포스트</h1>
      {getRecentPosts(5).map((post) => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </Content>
  );
}
