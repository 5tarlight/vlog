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
