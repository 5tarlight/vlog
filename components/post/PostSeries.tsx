"use client";

import { PostMeta } from "@/api/postMeta";
import { Series } from "@/api/series";
import Link from "next/link";
import { useState } from "react";

const PostSeries = ({
  series,
  posts,
}: {
  series: Series;
  posts: PostMeta[];
}) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    // TODO : Adjust color
    <div className="bg-[#cfffd7] w-full p-8 rounded-2xl mb-16 border-4 border-green-600">
      <h4>
        {/* TODO : Link to series page */}
        <b>{series.name}</b>
      </h4>
      {posts.map((post) => (
        <div key={post.identifier}>
          <Link href={`/post/${post.identifier}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default PostSeries;
