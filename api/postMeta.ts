export interface PostMeta {
  id: number;
  identifier: string;
  title: string;
  description: string;
  date: string;
  path: string;
  series?: number;
  tags: string[];
  cover?: string;
  coverWidth?: number;
  coverHeight?: number;
}

export const postMetas: PostMeta[] = [
  {
    id: 3,
    title: "Next.js로 블로그 만들기",
    identifier: "make-blog-with-nextjs",
    description: "Next.js로 블로그를 만들어보자",
    date: "2024. 04. 19",
    path: "make-blog/blog-spec.md",
    series: 1,
    tags: ["next.js", "blog", "tailwind css"],
  },
  {
    id: 4,
    title: "블로그 핵심 기능 구현",
    identifier: "blog-fundamental-feature",
    description: "핵심 기능을 구현해보자",
    date: "2024. 04. 19",
    path: "make-blog/layout-style.md",
    series: 1,
    tags: ["next.js", "css", "tailwind css"],
  },
  {
    id: 5,
    title: "블로그에 Open Graph 추가하기",
    identifier: "add-open-graph-to-blog",
    description: "블로그에 Open Graph를 추가해보자",
    date: "2024. 04. 21",
    path: "make-blog/open-graph.md",
    series: 1,
    tags: ["next.js", "open graph", "meta tag", "seo"],
  },
];
