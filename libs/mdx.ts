import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";

export const serializeMdx = async (src: string) => {
  return serialize(src, {
    mdxOptions: {
      remarkPlugins: [
        remarkParse,
        remarkMath,
        // remarkRehype,
        remarkGfm,
        remarkBreaks,
        remarkToc,
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeStringify,
        rehypePrism,
        rehypeAutolinkHeadings,
      ],
      format: "mdx",
    },
  });
};
