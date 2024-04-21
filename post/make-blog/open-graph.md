## Open Graph가 뭐지?

웹사이트를 공유할 때 URL을 사용한다. 그런데 URL만을 보고는 이 사이트가 어떤 사이트인지 클릭해봐도 괜찮은 링크일지 알 수 없다. Open Graph(OG)는 웹사이트의 메타 데이터를 쉽게 확인할 수 있도록 페이스북(메타)에 의해 만들어진 프로토콜이다. 유명한 사이트의 경우 카카오톡이나 다른 메신저에 URL을 보냈을 때 이 사이트 또는 페이지에 어떤 콘텐츠가 있는지, 대표 이미지 등이 표시되는것을 봤을 것이다.
특히 블로그의 경우 글 단위로 URL이 공유되는 경우가 많다. 어떤 글이 공유되었을때 **"YEAHx4 블로그"**라고 단순하게 표시되는 것이 좋을까 **"블로그에 Open Graph 적용하기 | YEAHx4 Blog"**라고 표시되는 것이 좋을까? 당연히 후자일 것이다. 글의 내용을 파악할 수 있는 제목과 간단한 설명, 미리보기 이미지까지 제공되면 더 매력적으로 느껴질 것이다.

![이 블로그는 이렇게 보인다](post/blog/open-graph/open-graph-of-this.png)

## 그럼 어떻게 쓰는데?

Open Graph는 HTML의 `head`태그 안에 정의하는 방식이다.

```html
<head>
  <meta property="og:title" content="제목" />
  <!-->절대 경로여야 한다<--->
  <meta property="og:image" content="https://example.com" />
  <meta property="og:url" content="https://example.com" />
  <meta property="og:description" content="멋진 블로그" />
</head>
```

우리는 Next.js를 사용하고 있기 때문에 Next다운 방법을 사용해보자. [Next.js 공식 문서](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)를 참고해보면 OG를 만드는 방법은 Static과 Dynamic으로 두가지 방법이 있다. Static 방식의 경우 항상 똑같은 **고정된** 내용만 보여줄 수 있다. 그래서 사이트 전체의 OG를 static으로 만들어 두고 다른 내용이 필요한 경우 dynamic으로 덮어쓰는 방식으로 사용할 수 있다. 특히 포스트의 제목과 내용에 따라 달라져야 하기 때문에 dynamic 방식을 사용해야 한다.

Static 방식은 아래처럼 쓸 수 있다.

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "...",
  description: "...",
};

export default function Page() {}
```

Dynamic 방식은 아래처럼 쓸 수 있다.

```ts
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  // ...
};

export async function generateMetadata(
  {}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // ... fetch

  return {
    title: product.title,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default function Page({ params, searchParams }: Props) {}
```

### Open Graph 적용

이제 사용법을 알았으니 적용해보자. `layout.tsx`에서 사이트의 기본 OG를 설정해준다.

```ts
export const metadata: Metadata = {
  title: {
    template: "%s | YEAHx4",
    default: "YEAHx4",
  },
  description: "YEAHx4 개발 블로그",
  openGraph: {
    images: {
      url: getImage("thumbnail/yeahx4.png"),
      alt: "YEAHx4",
      width: 1280,
      height: 720,
    },
  },
  robots: {
    nocache: true,
    follow: true,
    index: true,
  },
  twitter: {
    creator: "@yeahx44",
  },
  category: "technology",
};
```

간략하게 보면

- title.template : 하위 페이지에서 title을 새롭게 지정한 경우 %s 자리에 들어가게 된다. 지정하지 않았다면 default값으로 지정된다.
- descriptoin : 기본 설명이다. 하위 페이지에서 새롭게 지정한 경우 덮여쓰인다.
- openGraph : OG 설정을 해준다.
- robots : 크롤러들의 설정이다.

이렇게 지정해두고 포스트 페이지에서 dynamic하게 필요한 내용을 업데이트 해주면 된다.

```ts
interface Props {
  params: { postid: string };
}

export async function generateMetadata(
  { params: { postid } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPost(postid);

  return {
    title: post?.meta.title || "Not Found",
    description: post?.meta.description,
    applicationName: "YEAHx4 BLOG",
    category: "blog",
    keywords: post?.meta.tags,
    openGraph: {
      title: post?.meta.title,
      images: {
        url: getImage(post?.meta.cover || "thumbnail/yeahx4.png"),
        alt: "YEAHx4",
        width: post?.meta.coverWidth || 1280,
        height: post?.meta.coverHeight || 720,
      },
      type: "article",
      authors: ["YEAHx4"],
    },
  };
}
```

이렇게 지정하면 위 그림처럼 작동하는 open graph를 얻을 수 있다.

## 테스트

[opengraph.dev](https://opengraph.dev/)에 open graph가 적용된 URL을 입력하면 어떻게 보이는지 확인할 수 있다. 다른 메신저를 사용하는 경우 캐싱때문에 바로바로 업데이트가 되지 않아서 테스트하기 불편할 수 있다.
