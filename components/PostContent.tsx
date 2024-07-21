"use client";

import { serializeMdx } from "@/libs/mdx";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostContent({ mdx }: { mdx: string }) {
  const [content, setContent] = useState<MDXRemoteSerializeResult>();
  useEffect(() => {
    serializeMdx(mdx).then((data) => setContent(data));
  }, []);

  return (
    <div className="prose dark:prose-dark flex justify-center">
      <div className="container">
        {content ? <MDXRemote {...content} /> : <Skeleton count={40} />}
      </div>
    </div>
  );
}
