"use client";

import Giscus from "@giscus/react";

export default function Comment() {
  return (
    <Giscus
      id="comments"
      repo="5tarlight/vlog"
      repoId="R_kgDOLq7W8A"
      category="Comment"
      categoryId="DIC_kwDOLq7W8M4Ce8hn"
      mapping="pathname"
      term="댓글을 남길 수 있습니다."
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="ko"
      loading="lazy"
    />
  );
}
