import { ReactNode } from "react";

const renderLine = (line: string) => {
  return <div>{line}</div>;
};

export const renderContent = (content: string) => {
  const lines = content.split("\n");
  const graph: ReactNode[] = [];
  const tableOfContent = [];
  const margin = (level: number) => ({ marginTop: `${level}rem` });

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("# ")) {
      graph.push(
        <h1 style={margin(3)} key={i} id={lines[i].substring(2)}>
          {renderLine(lines[i].substring(2))}
        </h1>
      );
      tableOfContent.push(lines[i].substring(2));
    } else if (lines[i].startsWith("## ")) {
      graph.push(
        <h2 style={margin(2)} key={i} id={lines[i].substring(3)}>
          {renderLine(lines[i].substring(3))}
        </h2>
      );
      tableOfContent.push(lines[i].substring(3));
    } else if (lines[i].startsWith("### ")) {
      graph.push(
        <h3 style={margin(1.75)} key={i} id={lines[i].substring(4)}>
          {renderLine(lines[i].substring(4))}
        </h3>
      );
      tableOfContent.push(lines[i].substring(4));
    } else if (lines[i].startsWith("#### ")) {
      graph.push(
        <h4 style={margin(1.5)} key={i} id={lines[i].substring(5)}>
          {renderLine(lines[i].substring(5))}
        </h4>
      );
      tableOfContent.push(lines[i].substring(5));
    } else if (lines[i].startsWith("##### ")) {
      graph.push(
        <h5 style={margin(1.25)} key={i} id={lines[i].substring(6)}>
          {renderLine(lines[i].substring(6))}
        </h5>
      );
      tableOfContent.push(lines[i].substring(6));
    } else if (lines[i].startsWith("###### ")) {
      graph.push(
        <h6 style={margin(1)} key={i} id={lines[i].substring(7)}>
          {renderLine(lines[i].substring(7))}
        </h6>
      );
      tableOfContent.push(lines[i].substring(7));
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
    } else {
      graph.push(<div key={i}>{renderLine(lines[i])}</div>);
    }
  }

  return {
    graph,
    tableOfContent,
  };
};