export interface Toc {
  value: string;
  level: number;
}

export const parseToc = (content: string): Toc[] => {
  const toc: Toc[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^#{1,6} (.*)$/);
    if (match) {
      toc.push({
        value: match[1],
        level: match[0].length - match[1].length - 1,
      });
    }
  }

  return toc;
};

export interface PostMeta {
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  cover: string;
  series: string;
  seriesIndex: number;
}

export const parsePost = (
  content: string
): { meta: PostMeta; body: string[] } => {
  const lines = content.split("\n");
  const meta: PostMeta = {
    title: "",
    description: "",
    author: "",
    cover: "",
    date: "",
    tags: [],
    series: "",
    seriesIndex: -1,
  };

  let body: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (line === "---") {
      body = lines.slice(i + 1);
      break;
    }

    // TODO : "title: abc: def" 형태의 데이터도 처리할 수 있도록 수정
    const [key, value] = line.split(":").map((x) => x.trim());

    if (key === "tags") {
      meta.tags = value.split(",").map((x) => x.trim());
    } else if (key === "seriesIndex") {
      meta.seriesIndex = parseInt(value);
    } else if (key === "title") {
      meta.title = value;
    } else if (key === "description") {
      meta.description = value;
    } else if (key === "author") {
      meta.author = value;
    } else if (key === "cover") {
      meta.cover = value;
    } else if (key === "date") {
      meta.date = value;
    } else if (key === "series") {
      meta.series = value;
    } else {
      console.warn(`Unknown key: ${key}`);
    }
  }

  return { meta, body };
};
