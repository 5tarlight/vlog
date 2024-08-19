"use client";

import { serializeMdx } from "@/libs/mdx";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

export default function PostContent({ mdx }: { mdx: string }) {
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    (async () => {
      setContent(await serializeMdx(mdx));
    })();
  }, [mdx]);

  return (
    <div className="prose dark:prose-dark flex justify-center">
      <div className="container">
        {content ? <MDXRemote {...content} /> : <></>}
      </div>
    </div>
  );
}
