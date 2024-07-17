import Content from "@/components/Content";
import PostPreview from "@/components/PostPreview";
import { getAllPosts } from "@/libs/posts";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { seriesName },
}: {
  params: { seriesName: string };
}) {
  const name = decodeURIComponent(seriesName.replace(/\+/g, "%20"));
  const posts = getAllPosts().filter((post) => post.series === name);

  if (!posts || posts.length == 0) notFound();

  return {
    title: `시리즈 ${name} 검색 결과` || "Not Found",
    description: `${posts.length}개의 포스트가 검색되었습니다.`,
    applicationName: "YEAHx4 BLOG",
    category: "blog",
    keywords: name,
    openGraph: {
      title: `시리즈 ${name} 검색 결과`,
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
  params: { seriesName },
}: {
  params: { seriesName: string };
}) {
  const name = decodeURIComponent(seriesName.replace(/\+/g, "%20"));
  const posts = getAllPosts()
    .filter((post) => post.series === name)
    .sort((a, b) => b.seriesIndex!! - a.seriesIndex!!);

  if (!posts || posts.length == 0) notFound();

  return (
    <Content>
      <h1 className="title-recent-post">시리즈 : {name}</h1>
      {posts ? (
        posts.map((post, i) => <PostPreview post={post} key={i} />)
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </Content>
  );
}
