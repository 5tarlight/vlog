"use client";

import { PostMeta } from "@/api/postMeta";
import { Series } from "@/api/series";
import Link from "next/link";
import { useState } from "react";
import {
  VscTriangleDown,
  VscTriangleLeft,
  VscTriangleRight,
  VscTriangleUp,
} from "react-icons/vsc";

const PostSeries = ({
  series,
  posts,
  postid,
}: {
  series: Series;
  posts: PostMeta[];
  postid: number;
}) => {
  const [dropdown, setDropdown] = useState(false);
  const currentIdx = posts.findIndex((post) => post.id === postid);

  return (
    // TODO : Adjust color
    <div className="bg-[#a5f2ff] w-full p-8 rounded-xl mb-16">
      <div className="mb-8">
        {/* TODO : Link to series page */}
        <h3 className="font-bold">{series.name}</h3>
        <div className="text-gray-600">{series.description}</div>
      </div>
      <div className="flex justify-between items-end">
        {dropdown ? (
          <div>
            <div
              className="flex select-none hover:cursor-pointer mb-2"
              onClick={() => setDropdown(!dropdown)}
            >
              <VscTriangleUp className="mt-[0.1rem] mr-2" />
              <div>시리즈 숨기기</div>
            </div>

            {posts.map((post) => (
              <div key={post.identifier}>
                <Link
                  className={
                    "hover:font-bold text-black " +
                    (postid === post.id
                      ? "underline font-bold hover:underline"
                      : "hover:no-underline ")
                  }
                  href={`/post/${post.identifier}`}
                >
                  {post.title}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex select-none hover:cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          >
            <VscTriangleDown className="mt-[0.1rem] mr-2" />
            <div>시리즈 보기</div>
          </div>
        )}
        {/* TODO : Goto next or previous post */}
        <div className="flex gap-4 select-none">
          <div>
            {currentIdx !== 0 ? (
              <Link
                href={`/post/${posts[currentIdx - 1].identifier}`}
                className="text-black"
              >
                <VscTriangleLeft className="mt-[0.15rem] cursor-pointer" />
              </Link>
            ) : (
              <VscTriangleLeft className="mt-[0.15rem] text-gray-400" />
            )}
          </div>
          <div>
            {currentIdx + 1} / {posts.length}
          </div>
          <div>
            {currentIdx !== posts.length - 1 ? (
              <Link
                href={`/post/${posts[currentIdx + 1].identifier}`}
                className="text-black"
              >
                <VscTriangleRight className="mt-[0.15rem] cursor-pointer" />
              </Link>
            ) : (
              <VscTriangleRight className="mt-[0.15rem] text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSeries;
