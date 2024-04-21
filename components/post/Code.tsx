"use client";

import { CodeBlock, dracula } from "react-code-blocks";

const Code = ({ text, language }: { text: string; language: string }) => {
  return (
    <div>
      <CodeBlock
        text={text}
        language={language}
        showLineNumbers={false}
        theme={dracula}
      />
    </div>
  );
};

export default Code;
