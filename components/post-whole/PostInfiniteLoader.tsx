// "use client";

// import { parsePost, PostMeta } from "@/lib/post/parser";
// import useOnScreen from "@/lib/utils/isVisible";
// import { useEffect, useRef, useState } from "react";
// import PostSummary from "./PostSummary";
// import Link from "next/link";
// import PostSkeleton from "./PostSkeleton";

// export default function PostIinfiniteLoader({
//   posts,
//   series,
// }: {
//   posts: string[];
//   series: {
//     [key: string]: {
//       name: string;
//       description: string;
//       posts: string[];
//     };
//   };
// }) {
//   const [loadedPosts, setLoadedPosts] = useState<PostMeta[]>([]);
//   const [loading, setLoading] = useState(false);

//   const triggerRef = useRef<HTMLDivElement>(null);
//   const shouldLoad = useOnScreen(triggerRef);

//   useEffect(() => {
//     if (loading || loadedPosts.length === posts.length || !shouldLoad) return;

//     const loadNextPost = async () => {
//       setLoading(true);
//       const start = Date.now();

//       const nextPost = posts[loadedPosts.length];
//       if (!nextPost) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch("/api/posts", {
//           method: "POST",
//           body: JSON.stringify({ path: nextPost }),
//         });

//         const { content } = await res.json();
//         const meta = parsePost(content).meta;

//         const end = Date.now();
//         if (end - start < 200) {
//           await new Promise((resolve) =>
//             setTimeout(resolve, 200 - (end - start))
//           );
//         }

//         setLoadedPosts((prev) => [...prev, meta]);
//       } catch (error) {
//         console.error("Failed to load post:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadNextPost();
//   }, [shouldLoad, loading, posts, loadedPosts]);

//   return (
//     <div className="max-w-5xl w-full mx-auto px-4">
//       <div className="flex flex-col gap-8">
//         {loadedPosts.map((post, index) => (
//           <Link href={`/posts/${posts[index]}`} key={index}>
//             <PostSummary
//               meta={post}
//               seriesName={post.series && series[post.series].name}
//             />
//           </Link>
//         ))}
//       </div>

//       {loading ? (
//         <div className="mt-8">
//           <PostSkeleton />
//         </div>
//       ) : (
//         <div ref={triggerRef} />
//       )}
//     </div>
//   );
// }
