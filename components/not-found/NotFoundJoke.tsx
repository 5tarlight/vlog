export default function NotFoundJoke() {
  const funnyMessages = [
    "이런! 여긴 아무것도 없어요.",
    "우리가 이 페이지를 본 마지막 사람은... 다시 돌아오지 못했어요.",
    "누군가 이 페이지를 지운 것 같아요. 범인은 아직도 잡히지 않았어요.",
    "404. 커피 타러 갔다가 길을 잃었어요.",
    "죄송합니다. 여기 있던 콘텐츠는 야근하다 도망갔어요.",
    "주소창을 한 번 더 확인해보실래요?",
    "404. 이건 당신의 잘못이 아닐 수도 있어요.",
    "혹시 마법의 단축키를 누르셨나요?",
    "이곳은 존재하지 않는 곳이에요. 적어도 지금은.",
    "이 페이지는 어제까지만 해도 있었어요. 진짜로요.",

    "여긴 아직 맵이 열리지 않은 지역이에요.",
    "404. 이 페이지는 다른 차원으로 이동했어요.",
    "여기는 비밀의 방입니다. 아무도 못 들어와요.",
    "고양이가 코드를 건드렸어요.",
    "404. 귀여운 토끼가 링크를 잘못 안내했어요.",
    "이건 테스트였고... 당신은 통과하지 못했어요!",
    "당신은 숨겨진 페이지를 찾아냈습니다... 라고 하고 싶네요.",
    "당신은 새로운 세계의 문을 열려 했지만, 열쇠가 없네요.",

    "404: const page = undefined;",
    "이 페이지는 git에서 force push 당했어요.",
    "render() 했는데 null만 반환되네요.",
    "컴파일은 성공했지만 경로가 틀렸어요.",
    "이 페이지는 deprecated 되었어요.",
    "import 페이지 from '다른 차원'; // 실패",
    "if (page.exists()) { show() } else { throw 404 }",
  ];
  const message =
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return <p className="text-xs text-neutral-400 italic mt-2">{message}</p>;
}
