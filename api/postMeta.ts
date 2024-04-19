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
    id: 0,
    title: "Hello World",
    identifier: "hello",
    description: "블로그에 오신 것을 환영합니다!",
    date: "2024. 04. 08",
    path: "demo/hello.md",
    series: 0,
    tags: ["hello world", "blog", "test"],
    cover: "thumbnail/hello_cover.png",
  },
  {
    id: 2,
    title: "Hello World 2",
    identifier: "hello2",
    description: "두 번째 글",
    date: "2024. 04. 09",
    path: "demo/mid.md",
    series: 0,
    tags: ["hello world"],
  },
  {
    id: 1,
    title: "Bye World",
    identifier: "bye",
    description: "시리즈 테스트를 위한 글",
    date: "2024. 04. 09",
    path: "demo/bye.md",
    series: 0,
    tags: ["hello world"],
  },
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
];
