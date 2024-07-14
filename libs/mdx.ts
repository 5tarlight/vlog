import { serialize } from "next-mdx-remote/serialize";

export const serializeMdx = (src: string) => {
  return serialize(src, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      format: "mdx",
    },
  });
};
