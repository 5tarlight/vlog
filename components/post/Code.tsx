"use client";

import { CodeBlock } from "react-code-blocks";

const Code = ({ text, language }: { text: string; language: string }) => {
  return (
    <div>
      <CodeBlock text={text} language={language} />
    </div>
  );
};

export default Code;
