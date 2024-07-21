"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useEffect, useState } from "react";

export default function PostContent({
  mdx,
}: {
  mdx: Promise<MDXRemoteSerializeResult>;
}) {
  const [content, setContent] = useState<MDXRemoteSerializeResult>();
  useEffect(() => {
    mdx.then((data) => setContent(data));
  }, []);

  return (
    <div className="prose dark:prose-dark flex justify-center">
      <div className="container">
        {content ? <MDXRemote {...content} /> : <div>Loading...</div>}
      </div>
    </div>
  );
}
