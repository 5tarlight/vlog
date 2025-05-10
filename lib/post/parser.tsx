import CodeBlock from "@/components/post/CodeBlock";
import Equation from "@/components/post/Equation";
import MultiCodeBlock from "@/components/post/MultiCodeBlock";
import PostImage from "@/components/post/PostImage";
import PostLink from "@/components/post/PostLink";
import React, { ReactNode } from "react";

export interface Toc {
  value: string;
  level: number;
}

export const parseToc = (content: string): Toc[] => {
  const toc: Toc[] = [];
  const lines = content.split("\n");

  let isInCodeBlock = false;
  for (const line of lines) {
    const match = line.match(/^#{1,6} (.*)$/);
    if (!isInCodeBlock && match) {
      toc.push({
        value: match[1],
        level: match[0].length - match[1].length - 1,
      });
    } else if (line.startsWith("```")) {
      isInCodeBlock = !isInCodeBlock;
    }
  }

  return toc;
};

export interface PostMeta {
  title: string;
  description: string;
  author: string;
  date: string;
  update: string;
  tags: string[];
  cover: string;
  series: string;
  seriesIndex: number;
  coverTitle?: string;
  coverSub?: string;
  coverColor?: string;
  coverBg?: string;
  coverTs?: number;
  coverSs?: number;
  bodyLength: number;
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
    update: "",
    tags: [],
    series: "",
    seriesIndex: -1,
    bodyLength: 0,
  };

  let body: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (line === "---") {
      body = lines.slice(i + 1);
      break;
    }

    const colon = line.indexOf(":");

    if (colon === -1) {
      console.warn(`Invalid meta line: ${line}`);
      continue;
    }

    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();

    if (key === "tags") {
      meta.tags = value.split(",").map((x) => x.trim());
    } else if (key === "seriesIndex") {
      meta.seriesIndex = parseInt(value);
    } else if (key === "coverTs") {
      meta.coverTs = parseInt(value);
    } else if (key === "coverSs") {
      meta.coverSs = parseInt(value);
    } else {
      (meta as unknown as Record<string, string>)[key] = value;
    }

    if (!meta.update) meta.update = meta.date;
  }

  meta.bodyLength = body.join("\n").length;

  return { meta, body };
};

export const buildCoverUrl = (meta: PostMeta) => {
  let url = "/api/posts/image?";

  if (meta.coverTitle) url += `title=${encodeURIComponent(meta.coverTitle)}&`;
  if (meta.coverSub) url += `sub=${encodeURIComponent(meta.coverSub)}&`;
  if (meta.coverColor) url += `color=${encodeURIComponent(meta.coverColor)}&`;
  if (meta.coverBg) url += `bg=${encodeURIComponent(meta.coverBg)}&`;
  if (meta.coverTs) url += `ts=${meta.coverTs}&`;
  if (meta.coverSs) url += `ss=${meta.coverSs}&`;

  return url;
};

export const renderLine = (line: string): ReactNode => {
  const italicRegex = /_([^_]+)_/g;
  const boldRegex = /\*\*([^\*]+)\*\*/g;
  const codeRegex = /`(.*?)`/g;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const strikethroughRegex = /~([^~]+)~/g;
  const underlineRegex = /__([^_]+)__/g;
  const mathRegex = /\$([^\$]+)\$/g;

  const processMarkdown = (text: string): ReactNode => {
    let lastIndex = 0;
    const elements: ReactNode[] = [];

    const patterns = [
      {
        regex: boldRegex,
        render: (key: string, match: string) => (
          <strong key={key}>{match}</strong>
        ),
      },
      {
        regex: italicRegex,
        render: (key: string, match: string) => <em key={key}>{match}</em>,
      },
      {
        regex: codeRegex,
        render: (key: string, match: string) => (
          <code className="inline-code" key={key}>
            {match}
          </code>
        ),
      },
      {
        regex: linkRegex,
        render: (key: string, match: string, href?: string) => (
          <PostLink key={key} href={href!} text={match} />
        ),
      },
      {
        regex: strikethroughRegex,
        render: (key: string, match: string) => <del key={key}>{match}</del>,
      },
      {
        regex: underlineRegex,
        render: (key: string, match: string) => <u key={key}>{match}</u>,
      },
      {
        regex: mathRegex,
        render: (key: string, match: string) => (
          <Equation key={key} eq={match} inline />
        ),
      },
    ];

    while (lastIndex < text.length) {
      let closestMatch = null;
      let closestPattern = null;
      let closestIndex = text.length;

      for (const { regex, render } of patterns) {
        regex.lastIndex = lastIndex;
        const match = regex.exec(text);
        if (match && match.index < closestIndex) {
          closestMatch = match;
          closestPattern = { regex, render };
          closestIndex = match.index;
        }
      }

      if (closestMatch && closestPattern) {
        if (closestIndex > lastIndex) {
          elements.push(text.slice(lastIndex, closestIndex));
        }

        const key = `inline-${closestIndex}`;
        if (closestPattern.regex === linkRegex) {
          elements.push(
            closestPattern.render(key, closestMatch[1], closestMatch[2])
          );
        } else {
          elements.push(closestPattern.render(key, closestMatch[1]));
        }

        lastIndex = closestPattern.regex.lastIndex;
      } else {
        elements.push(text.slice(lastIndex));
        break;
      }
    }

    return elements;
  };

  return <>{processMarkdown(line)}</>;
};

function parseUnorderedList(content: string[], i: number, level = 0) {
  const list = [];
  let j = i;

  while (
    content[j] &&
    content[j].trimStart().startsWith("-") &&
    content[j].indexOf("-") / 2 === level
  ) {
    let itemText = content[j].replace("-", "").trim();

    while (
      j + 1 < content.length &&
      content[j + 1].startsWith(" ") &&
      !content[j + 1].trimStart().startsWith("-")
    ) {
      itemText += " " + content[j + 1].trim();
      j++;
    }

    if (
      j + 1 < content.length &&
      content[j + 1] &&
      content[j + 1].trimStart().startsWith("-") &&
      content[j + 1].indexOf("-") / 2 === level + 1
    ) {
      const nestedList = parseUnorderedList(content, j + 1, level + 1);

      list.push(
        <li key={j}>
          {renderLine(itemText)}
          <ul>{nestedList.list}</ul>
        </li>
      );

      j = nestedList.endIndex;
    } else {
      list.push(<li key={j}>{renderLine(itemText)}</li>);
    }

    j++;
  }
  return { list, endIndex: j - 1 };
}

function parseOrderedList(content: string[], i: number, level = 0) {
  const list = [];
  let j = i;

  while (
    content[j] &&
    /^\d+\./.test(content[j].trimStart()) &&
    content[j].indexOf(content[j].trimStart().match(/^\d+\./)![0]) / 3 === level
  ) {
    let itemText = content[j].replace(/^\s*\d+\./, "").trim();

    while (
      j + 1 < content.length &&
      content[j + 1].startsWith(" ") &&
      !/^\d+\./.test(content[j + 1].trimStart())
    ) {
      itemText += " " + content[j + 1].trim();
      j++;
    }

    if (
      j + 1 < content.length &&
      content[j + 1].trimStart() &&
      (content[j + 1].trimStart().startsWith("-") ||
        /^\d+\./.test(content[j + 1].trimStart())) &&
      content[j + 1].indexOf(
        content[j + 1].trimStart().match(/^\d+\./)
          ? content[j + 1].trimStart().match(/^\d+\./)![0]
          : "-"
      ) /
        3 ===
        level + 1
    ) {
      const nestedList = /^\d+\./.test(content[j + 1].trimStart())
        ? parseOrderedList(content, j + 1, level + 1)
        : parseUnorderedList(content, j + 1, level + 1);

      list.push(
        <li key={j}>
          {renderLine(itemText)}
          <ol>{nestedList.list}</ol>
        </li>
      );

      j = nestedList.endIndex;
    } else {
      list.push(<li key={j}>{renderLine(itemText)}</li>);
    }

    j++;
  }
  return { list, endIndex: j - 1 };
}

const renderTable = (markdown: string): ReactNode => {
  const lines = markdown.split("\n");
  const table: ReactNode[] = [];
  let header: ReactNode[] = [];
  const rows: ReactNode[][] = [];
  let isHeader = true;

  lines.forEach((line, index) => {
    if (line.trim().startsWith("|")) {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());
      if (isHeader) {
        header = cells.map((cell, i) => (
          <th key={`header-${i}`}>{renderLine(cell)}</th>
        ));
        isHeader = false;
      } else {
        rows.push(
          cells.map((cell, i) => (
            <td key={`cell-${index}-${i}`}>{renderLine(cell)}</td>
          ))
        );
      }
    }
  });

  table.push(
    <table key="table">
      <thead>
        <tr>{header}</tr>
      </thead>
      <tbody>
        {rows.slice(1).map((row, i) => (
          <tr key={`row-${i}`}>{row}</tr>
        ))}
      </tbody>
    </table>
  );

  return table;
};

const renderCustomBlock = (
  command: string,
  params: string[],
  body: string[]
): ReactNode => {
  if (command === "multilang") {
    const name = params;
    const code = [];
    const lang = [];

    let isInCodeBlock = false;
    let tmp = "";
    for (let i = 0; i < body.length; i++) {
      if (isInCodeBlock) {
        if (body[i].startsWith("```")) {
          isInCodeBlock = false;
          code.push(tmp);
          tmp = "";
          continue;
        }

        tmp += body[i] + "\n";
      } else if (body[i].startsWith("```")) {
        isInCodeBlock = true;
        const langMatch = body[i].match(/```(\w+)/);
        if (langMatch) {
          lang.push(langMatch[1]);
        }
      }
    }

    console.assert(
      name.length === code.length && name.length === lang.length,
      "Multilang block: name, code, and lang lengths do not match"
    );

    return <MultiCodeBlock code={code} lang={lang} name={name} />;
  }

  return (
    <div style={{ color: "red", fontSize: "3rem" }}>
      Error: unknown custom block {command}
    </div>
  );
};

const IMAGE_REGEX = /!\[([^\]]+)\]\(([^)]+)\)/;
const TABLE_ROW_REGEX = /^\|(.+)\|$/;

export const toHtml = (content: string[]) => {
  const html: ReactNode[] = [];

  for (let i = 0; i < content.length; i++) {
    if (content[i].startsWith("######"))
      html.push(
        <h6 id={content[i].replace("######", "").trim()} key={i}>
          {content[i].replace("######", "").trim()}
        </h6>
      );
    else if (content[i].startsWith("#####"))
      html.push(
        <h5 id={content[i].replace("#####", "").trim()} key={i}>
          {content[i].replace("#####", "").trim()}
        </h5>
      );
    else if (content[i].startsWith("####"))
      html.push(
        <h4 id={content[i].replace("####", "").trim()} key={i}>
          {content[i].replace("####", "").trim()}
        </h4>
      );
    else if (content[i].startsWith("###"))
      html.push(
        <h3 id={content[i].replace("###", "").trim()} key={i}>
          {content[i].replace("###", "").trim()}
        </h3>
      );
    else if (content[i].startsWith("##"))
      html.push(
        <h2 id={content[i].replace("##", "").trim()} key={i}>
          {content[i].replace("##", "").trim()}
        </h2>
      );
    else if (content[i].startsWith("#"))
      html.push(
        <h1 id={content[i].replace("#", "").trim()} key={i}>
          {content[i].replace("#", "").trim()}
        </h1>
      );
    else if (content[i].startsWith("---")) html.push(<hr key={i} />);
    else if (content[i].startsWith("-")) {
      const parsedList = parseUnorderedList(content, i);
      html.push(
        <ul key={i} className="list-container">
          {parsedList.list}
        </ul>
      );
      i = parsedList.endIndex;
    } else if (content[i].startsWith("1.")) {
      const parsedList = parseOrderedList(content, i);
      html.push(
        <ol key={i} className="list-container">
          {parsedList.list}
        </ol>
      );
      i = parsedList.endIndex;
    } else if (content[i].startsWith("```")) {
      const lang = content[i].replace("```", "").trim();

      const code = [];
      let j = i + 1;
      while (j < content.length && !content[j].startsWith("```")) {
        code.push(content[j]);
        j++;
      }

      if (lang === "math") {
        html.push(<Equation key={i} eq={code.join("\n")} />);
      } else {
        html.push(<CodeBlock lang={lang} content={code.join("\n")} key={i} />);
      }

      i = j;
    } else if (IMAGE_REGEX.test(content[i])) {
      const match = content[i].match(IMAGE_REGEX);
      const alt = match![1];
      const href = match![2];

      html.push(<PostImage key={i} src={href} alt={alt} />);
    } else if (content[i].startsWith(">")) {
      let quote = content[i].replace(">", "").trim();

      while (i + 1 < content.length && content[i + 1].startsWith(">")) {
        quote += " " + content[i + 1].replace(">", "").trim();
        i++;
      }

      html.push(<blockquote key={i}>{renderLine(quote)}</blockquote>);
    } else if (content[i] === "<br />") {
      html.push(<br key={i} />);
    } else if (content[i] === "") {
      html.push(<p key={i} />);
    } else if (TABLE_ROW_REGEX.test(content[i])) {
      const tableRows = [];
      while (i < content.length && TABLE_ROW_REGEX.test(content[i])) {
        tableRows.push(content[i]);
        i++;
      }
      i--;

      const table = renderTable(tableRows.join("\n"));
      html.push(<div key={i}>{table}</div>);
    } else if (content[i].startsWith("%") && !content[i].startsWith("%end")) {
      // %multilang:js,py
      // %endmultilang
      const rawCommand = content[i].slice(1).trim();
      const tokens = rawCommand.split(":");
      const command = tokens[0].trim();
      const params =
        tokens.length > 1 ? tokens[1].split(",").map((x) => x.trim()) : [];

      const body: string[] = [];
      while (i + 1 < content.length) {
        const nextLine = content[i + 1];
        if (nextLine.startsWith("%end")) {
          i++;
          break;
        }
        body.push(nextLine);
        i++;
      }
      i++;

      const rendered = renderCustomBlock(command, params, body);
      html.push(
        <div key={i} className="custom-block">
          {rendered}
        </div>
      );
    } else {
      let paragraph = content[i];

      while (i + 1 < content.length && content[i + 1] !== "") {
        paragraph += " " + content[i + 1];
        i++;
      }

      html.push(<p key={i}>{renderLine(paragraph)}</p>);
    }
  }

  return html;
};
