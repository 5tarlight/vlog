import React, { ReactNode } from "react";

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
        render: (key: string, match: string) => <code key={key}>{match}</code>,
      },
      {
        regex: linkRegex,
        render: (key: string, match: string, href?: string) => (
          <a key={key} href={href}>
            {match}
          </a>
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
          <span key={key} className="math">
            {match}
          </span>
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

      html.push(
        <pre key={i}>
          <code className={`language-${lang}`}>{code.join("\n")}</code>
        </pre>
      );

      i = j;
    } else if (IMAGE_REGEX.test(content[i])) {
      const match = content[i].match(IMAGE_REGEX);
      const alt = match![1];
      const href = match![2];

      html.push(<img key={i} src={href} alt={alt} />);
    } else if (content[i].startsWith(">")) {
      let quote = content[i].replace(">", "").trim();

      while (i + 1 < content.length && content[i + 1].startsWith(">")) {
        quote += content[i + 1].replace(">", "").trim();
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
