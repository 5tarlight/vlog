import { postMetas } from "./postMeta";

export interface Series {
  id: number;
  name: string;
  description: string;
  path: string;
}

export const series: Series[] = [
  {
    id: 0,
    name: "Demo",
    description: "블로그의 기능을 테스트하기 위한 시리즈",
    path: "demo",
  },
  {
    id: 1,
    name: "Next.js로 블로그 만들기",
    description: "이 블로그를 만드는 여정",
    path: "blog",
  },
];

export const getPostsInSeries = (seriesId: number) => {
  return postMetas.filter((post) => post.series === seriesId);
};

export const getSeries = (seriesId: number) => {
  return series.find((s) => s.id === seriesId);
};
