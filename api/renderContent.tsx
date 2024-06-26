import Code from "@/components/post/Code";
import { ReactNode } from "react";
import { getImage } from "./imageCdn";

const renderLine = (line: string) => {
  const result: ReactNode[] = [];

  for (let i = 0; i < line.length; i++) {
    if (line[i] === "*" && line[i + 1] === "*") {
      let j = i + 2;
      while (line[j] !== "*" || line[j + 1] !== "*") j++;

      result.push(<b key={i}>{line.substring(i + 2, j)}</b>);

      i = j + 1;
    } else if (line[i] === "_") {
      let j = i + 1;
      while (line[j] !== "_") j++;

      result.push(<i key={i}>{line.substring(i + 1, j)}</i>);

      i = j;
    } else if (line[i] === "`") {
      let j = i + 1;
      while (line[j] !== "`") j++;

      result.push(
        <code className="code" key={i}>
          {line.substring(i + 1, j)}
        </code>
      );

      i = j;
    } else if (line[i] === "!" && i < line.length - 1 && line[i + 1] === "[") {
      let j = i + 2;
      while (line[j] !== "]") j++;
      const alt = line.substring(i + 2, j);

      j += 2;
      let k = j;
      while (line[k] !== ")") k++;
      const src = line.substring(j, k);

      result.push(
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{ margin: "1rem 0", height: "300px" }}
            src={getImage(src)}
            alt={alt}
          />
        </div>
      );

      i = k;
    } else if (line[i] === "[") {
      // First, check if it is a link
      let isLink = true;

      let j = i + 1;
      while (j < line.length && line[j] !== "]") j++;

      if (j === line.length || line[j + 1] !== "(") isLink = false;

      if (!isLink) {
        result.push(line[i]);
        continue;
      }

      const text = line.substring(i + 1, j);

      j += 2;
      let k = j;
      while (line[k] !== ")") k++;
      const href = line.substring(j, k);

      result.push(
        <a key={i} href={href} className="text-blue-500">
          {text}
        </a>
      );

      i = k;
    } else {
      result.push(line[i]);
    }
  }

  return <div>{result}</div>;
};

export type TableOfContent = { text: string; level: number };

export const renderContent = (content: string) => {
  const lines = content.split("\n");
  const graph: ReactNode[] = [];
  const tableOfContent: TableOfContent[] = [];
  const margin = (level: number) => ({ marginTop: `${level}rem` });

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("# ")) {
      graph.push(
        <h1 style={margin(3)} key={i} id={lines[i].substring(2)}>
          {renderLine(lines[i].substring(2))}
        </h1>
      );
      tableOfContent.push({ text: lines[i].substring(2), level: 1 });
    } else if (lines[i].startsWith("## ")) {
      graph.push(
        <h2 style={margin(2)} key={i} id={lines[i].substring(3)}>
          {renderLine(lines[i].substring(3))}
        </h2>
      );
      tableOfContent.push({ text: lines[i].substring(3), level: 2 });
    } else if (lines[i].startsWith("### ")) {
      graph.push(
        <h3 style={margin(1.75)} key={i} id={lines[i].substring(4)}>
          {renderLine(lines[i].substring(4))}
        </h3>
      );
      tableOfContent.push({ text: lines[i].substring(4), level: 3 });
    } else if (lines[i].startsWith("#### ")) {
      graph.push(
        <h4 style={margin(1.5)} key={i} id={lines[i].substring(5)}>
          {renderLine(lines[i].substring(5))}
        </h4>
      );
      tableOfContent.push({ text: lines[i].substring(5), level: 4 });
    } else if (lines[i].startsWith("##### ")) {
      graph.push(
        <h5 style={margin(1.25)} key={i} id={lines[i].substring(6)}>
          {renderLine(lines[i].substring(6))}
        </h5>
      );
      tableOfContent.push({ text: lines[i].substring(6), level: 5 });
    } else if (lines[i].startsWith("###### ")) {
      graph.push(
        <h6 style={margin(1)} key={i} id={lines[i].substring(7)}>
          {renderLine(lines[i].substring(7))}
        </h6>
      );
      tableOfContent.push({ text: lines[i].substring(7), level: 6 });
    } else if (lines[i].startsWith("- ")) {
      const list = [];
      let j = i;
      while (lines[j].startsWith("- ")) {
        list.push(<li key={j}>{renderLine(lines[j].substring(2))}</li>);
        j++;
      }
      graph.push(<ul key={i}>{list}</ul>);
      i = j - 1;
    } else if (lines[i].startsWith("1. ")) {
      const list = [];
      let j = i;
      while (lines[j].startsWith(`${list.length + 1}. `)) {
        list.push(<li key={j}>{renderLine(lines[j].substring(3))}</li>);
        j++;
      }
      graph.push(<ol key={i}>{list}</ol>);
      i = j - 1;
    } else if (lines[i].startsWith("```")) {
      const language = lines[i].substring(3);
      let j = i + 1;
      while (!lines[j].startsWith("```")) j++;

      // TODO : language highlight
      graph.push(
        <div style={{ margin: "2rem 0" }} key={i}>
          <Code language={language} text={lines.slice(i + 1, j).join("\n")} />
        </div>
      );

      i = j;
    } else {
      graph.push(<div key={i}>{renderLine(lines[i])}</div>);
    }
  }

  return {
    graph,
    tableOfContent,
  };
};
