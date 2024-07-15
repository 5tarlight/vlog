"use client";

import { MDXRemote } from "next-mdx-remote";

export default function PostContent({ mdx }: { mdx: any }) {
  return (
    <div className="prose dark:prose-dark mt-4 w-full max-w-none">
      <MDXRemote {...mdx} />
    </div>
  );
}
