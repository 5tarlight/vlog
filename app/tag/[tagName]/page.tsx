import Content from "@/components/Content";
import PostPreview from "@/components/PostPreview";
import { getAllPosts } from "@/libs/posts";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { tagName },
}: {
  params: { tagName: string };
}) {
  const name = decodeURIComponent(tagName.replace(/\+/g, "%20"));
  const posts = getAllPosts().filter((post) => post.tags.includes(name));

  if (!posts || posts.length == 0) notFound();

  return {
    title: `태그 ${name} 검색 결과` || "Not Found",
    description: `${posts.length}개의 포스트가 검색되었습니다.`,
    applicationName: "YEAHx4 BLOG",
    category: "blog",
    keywords: name,
    openGraph: {
      title: `태그 ${name} 검색 결과`,
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

export default function Series({
  params: { tagName },
}: {
  params: { tagName: string };
}) {
  const name = decodeURIComponent(tagName.replace(/\+/g, "%20"));
  const posts = getAllPosts()
    .filter((post) => post.tags.includes(name))
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());

  if (!posts || posts.length == 0) notFound();

  return (
    <Content>
      <h1 className="title-recent-post">태그 : {name}</h1>
      {posts ? (
        posts.map((post, i) => <PostPreview post={post} key={i} />)
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </Content>
  );
}
