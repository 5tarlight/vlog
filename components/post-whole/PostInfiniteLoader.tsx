"use client";

import { parsePost, PostMeta } from "@/lib/post/parser";
import useOnScreen from "@/lib/utils/isVisible";
import { useEffect, useRef, useState } from "react";
import PostSummary from "./PostSummary";

export default function PostIinfiniteLoader({ posts }: { posts: string[] }) {
  const [loadedPosts, setLoadedPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const shouldLoad = useOnScreen(triggerRef);

  useEffect(() => {
    if (loading || loadedPosts.length === posts.length || !shouldLoad) return;

    const loadNextPost = async () => {
      setLoading(true);

      const nextPost = posts[loadedPosts.length];
      if (!nextPost) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({ path: nextPost }),
        });

        const { content } = await res.json();
        const meta = parsePost(content).meta;
        setLoadedPosts((prev) => [...prev, meta]);
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNextPost();
  }, [shouldLoad, loading, posts, loadedPosts]);

  return (
    <div className="max-w-5xl w-full mx-auto px-4">
      <div className="flex flex-col gap-4">
        {loadedPosts.map((post, index) => (
          <PostSummary key={index} meta={post} />
        ))}
      </div>

      {loading ? <div>Loading...</div> : <div ref={triggerRef} />}
    </div>
  );
}
