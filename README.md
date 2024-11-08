# YEAHx4 Tech Blog

제 개인 개발 블로그, 이름하여 vlog에 오신 것을 환영합니다! 이 블로그는 Next.js와 Typescript를
기반으로 제작되어 데이터베이스 없이 작동하는 블로그입니다. Vercel에서 배포할 것을 전제로 개발되었습니다.
자유롭게 소스코드를 참고, 변형해서 활용할 수 있지만 블로그에 작성된 글(`/posts`)과 이미지는
제거하시고 사용하셔야 합니다.

## 기능

- SSR
- RSS
- 댓글 (by giscus)
- 시리즈
- 검색
- 커버 이미지 동적 생성 ([참고](https://post.yeahx4.me/posts/make-blog/vercel-og))

## Requirements

- Node.js (20 or higher)

## Getting Started

### 댓글 시스템
댓글 시스템은 [giscus](https://giscus.app/)를 통해서 구현되었습니다.
`/app/components/post/Comment.tsx`에 관련 설정이 있습니다. 본인만의 댓글 시스템으로
교체하거나 본인의 레포에 맞게 설정을 변경해야 합니다.

1. giscus app 설치 ([링크](https://github.com/apps/giscus))
2. repo에 discussion을 활성화 ([문서](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository))
3. giscus 설정 ([링크](https://giscus.app/))
4. `Comment.tsx` 파일의 내용을 본인의 설정에 맞게 수정합니다.

### 포스트 작성

글은 `/posts` 디렉토리에 `.mdx` 형식으로 작성되고 있습니다. mdx의 경로가 실제 URL이 됩니다.
예를 들어 `/posts/test/example.mdx`는 `/posts/test/example`에서 접근할 수 있습니다.
mdx의 맨 위에는 포스트의 제목, 설명 같은 메타데이터를 포함하는 frontmatter가 옵니다. 기본적으로
모든 포스트에 필수적인 값들은 아래와 같습니다.

```mdx
title: 제목
description: 띄어쓰기가 있어도 따옴표는 쓰지 않아도 됩니다.
tags: 컴마로, 태그를, 구분합니다
date: 2024-11-8
author: yeahx4
```

그리고 모든 글은 커버 이미지가 있어야 합니다. 이미지 파일을 커버 이미지로 사용하고 싶은 경우
`/public/img/cover`에 이미지를 두고 frontmatter에 cover 값을 줘야 합니다. 예를 들어
`/.../cover/a/b.png`가 있는 경우 cover에 `a/b.png`로 지정할 수 있습니다.

시리즈 글인 경우 아래 헤더가 필요합니다
```mdx
series: make-blog
seriesIndex: 7
```

seriesIndex는 0부터 시작하는 글의 순서를 나타내며 실제 순서보단 표시되는 순서에 관련이 있습니다.
series에 사용되는 값은 시리즈를 나타내는 고유한 값이어야 하고 디렉토리 이름과 같아야 합니다.
예를 들어 위의 글에선 `/posts/make-blog/exmaple.mdx` 처럼 작성되어야 합니다.

이제 `/lib/post/posts.ts`에 글을 등록하면 포스트가 표시됩니다. 시리즈 글인 경우 `series`에
시리즈를 등록하고 시리즈에 글을 연결하면 되고, 독립된 글은 `/posts`에 등록하면 됩니다.
여기에 등록된 값에 맞춰 sitemap.xml과 RSS가 자동으로 생성됩니다.

### 커버 이미지 자동 생성

vlog에는 단색에 글씨가 적힌 커버 이미지를 자동으로 생성할 수 있는 기능이 탑재되어 있습니다.
frontmatter에 cover가 비어있거나 없는 경우 이 방식이 사용되게 됩니다. 좀더 디테일한
설명은 [제 글](https://post.yeahx4.me/posts/make-blog/vercel-og)에서 참고할 수
있습니다. 필요한 설정은 아래와 같습니다.

```mdx
coverTitle: FCP 줄이기
coverSub: w. Google Fonts
coverTs: 100
coverSs: 24
coverBg: 7C6CAF
coverColor: ffffff
```

주제목과 부제목을 지정할 수 있습니다. 비어두거나 지정하지 않으면 빈 값이 들어갑니다.
`Ts`는 Title size, `Ss`는 Sub size를 의미합니다. 각각 주제와 부제의 크기를 px단위로
지정합니다. `coverBg`는 이미지의 배경색을 지정하고 `coverColor`는 글씨의 색을 지정합니다.