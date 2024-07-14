export const serializeMdx = async (src: string) => {
  const { serialize } = await import("next-mdx-remote/serialize");
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: rehypePrism } = await import("rehype-prism-plus");
  const { default: rehypeAutolinkHeadings } = await import(
    "rehype-autolink-headings"
  );
  const { default: rehypeKatex } = await import("rehype-katex");
  const { default: remarkBreaks } = await import("remark-breaks");
  const { default: remarkMath } = await import("remark-math");

  return serialize(src, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkBreaks /*remarkMath*/],
      rehypePlugins: [
        rehypePrism,
        rehypeAutolinkHeadings,
        rehypeKatex,
        // {
        //   properties: {
        //     className: ["anchor"],
        //   },
        // },
      ],
      format: "mdx",
    },
  });
};
