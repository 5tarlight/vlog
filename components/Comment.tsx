"use client";

import Giscus from "@giscus/react";

export default function Comment() {
  return (
    <div className="comment-container">
      <Giscus
        repo="5tarlight/vlog"
        repoId="R_kgDOLq7W8A"
        category="Comment"
        categoryId="DIC_kwDOLq7W8M4Ce8hn"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
