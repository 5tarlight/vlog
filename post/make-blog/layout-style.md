## Tailwind CSS

이 프로젝트에서는 스타일링 시스템으로 [Tailwind CSS](https://tailwindcss.com/)를 사용하고 있다. 그래서 CSS를 사용하지 않고 `className`으로 스타일을 지정해 주게 된다. 그런데, 이 블로그는 md파일로 저장된 파일을 읽어와 렌더링 하는 방식으로 작동한다. 이 경우 tailwind css가 정상적으로 작동하지 않는다([참고 - Tailwind CSS](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)). 그리고 포스트에 사용될 컴포넌트들은 일관적인 스타일을 가져야 한다. 그래서 Next.js 에서 기본적으로 사용되는 `global.css`를 통해 포스트에 사용될 컴포넌트의 디자인을 넣기로했다.

### Preflight

Next.js 프로젝트를 만들 때 `create-next-app`을 사용해 Tailwind CSS를 설정하면 global.css에 아래와 같은 세 줄이 추가된다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

여기서 첫번째 `@tailwind base`에서 preflight가 주입된다. preflight는 브라우저에서 제공하는 기본 CSS때문에 생기는 스타일의 차이를 없에고자 미리 임의로 스타일을 초기화 시킨다. 대표적으로 `margin`이 0이 되고, heading과 `ul`, `ol`의 스타일이 없어진다. 자세한 내용은 [여기](https://tailwindcss.com/docs/preflight)에서 확인할 수 있다. 당연히 스타일이 없는 ul, ol과 헤딩을 그대로 사용할 수 없으므로 사이트의 디자인에 맞게 기본적인 스타일을 전부 재정의해준다.

## global.css

최종적으로 스타일을 지정한 CSS코드는 길어서 링크로 대체하겠다. [global.css](https://github.com/5tarlight/vlog/blob/292e983a88237e9a2dc73829d25348068a3d4642/app/globals.css)
