# YEAHx4 Tech Blog

This is a technical blog documenting the story of YEAHx4.
It is developed using Next.js 14.
You are free to use and modify the code, but you must change or remove all code connected to this repository before using it.

**Features**

- SSR
- Markdown-based post writing
- Comment (by giscus)
- Series post
- Search
- RSS

## Requirements

- Node.js (20 or higher)
- Vercel (or other deployment way)

## Getting Started

**Setting giscus**

[giscus](https://giscus.app/) is a comment system based on GitHub Discussions.
In the original source code, giscus is connected to this repository's discussions.
Therefore, you need to modify the configuration to link it to your own repository's discussions.

1. Install giscus app ([link](https://github.com/apps/giscus))
2. Enable discussions ([docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository))
3. Configure giscus ([link](https://giscus.app/))
4. Modify `/components/Comment.tsx` according to giscus's instruction.

**Writing Post**

All posts are stored in `/posts` directory in `.mdx` format.
If there is a markdown file named `/posts/hello/my-post.mdx`, the URL of that post will be `/post/hello/my-post`.
You can also specify the details of posts.
Add the following to the top of the `.mdx` file.

```mdx
---
title: "Next.js 14 블로그 만들기 - 테스트 포스트"
description: "The Test Post"
icon: ""
image: ""
tags:
  - test
draft: false
date: 2024-07-16 02:53:45
series: 블로그 만들기
seriesIndex: 0
---
```

For more detailed documentation, check `/libs/posts.ts` ([link](https://github.com/5tarlight/vlog/blob/main/libs/posts.ts))
