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
];
