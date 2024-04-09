export interface PostMeta {
  id: number;
  identifier: string;
  title: string;
  description: string;
  date: string;
  path: string;
  series?: number;
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
  },
  {
    id: 1,
    title: "Bye World",
    identifier: "bye",
    description: "시리즈 테스트를 위한 글",
    date: "2024. 04. 09",
    path: "demo/bye.md",
    series: 0,
  },
  {
    id: 2,
    title: "Hello World 2",
    identifier: "hello2",
    description: "두 번째 글",
    date: "2024. 04. 09",
    path: "demo/mid.md",
    series: 0,
  },
];
