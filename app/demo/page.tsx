import Gap from "@/components/util/Gap";
import GroupBox from "@/components/demo/GroupBox";
import Link from "next/link";

export default function Preview() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1024px] w-full">
        <h1>Style Demo</h1>

        <Gap h={4} />

        <GroupBox>
          <h1>Hello World H1</h1>
          <h2>Hello World H2</h2>
          <h3>Hello World H3</h3>
          <h4>Hello World H4</h4>
          <h5>Hello World H5</h5>
          <h6>Hello World H6</h6>
        </GroupBox>

        <Gap h={2} />

        <GroupBox>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            suscipit, ipsum et tincidunt fermentum, nunc odio fermentum augue,
            nec aliquet orci libero ut mi. Nullam nec nisl at enim ullamcorper
            tincidunt. Nullam nec nisl at enim ullamcorper tincidunt.
          </p>
          <Gap h={1} />
          <p>
            제3항의 승인을 얻지 못한 때에는 그 처분 또는 명령은 그때부터 효력을
            상실한다. 이 경우 그 명령에 의하여 개정 또는 폐지되었던 법률은 그
            명령이 승인을 얻지 못한 때부터 당연히 효력을 회복한다. 비상계엄이
            선포된 때에는 법률이 정하는 바에 의하여 영장제도,
            언론·출판·집회·결사의 자유, 정부나 법원의 권한에 관하여 특별한
            조치를 할 수 있다. 제1항의 탄핵소추는 국회재적의원 3분의 1 이상의
            발의가 있어야 하며, 그 의결은 국회재적의원 과반수의 찬성이 있어야
            한다. 다만, 대통령에 대한 탄핵소추는 국회재적의원 과반수의 발의와
            국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 모든 국민은 행위시의
            법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며,
            동일한 범죄에 대하여 거듭 처벌받지 아니한다.
          </p>
        </GroupBox>

        <Gap h={2} />

        <GroupBox>
          <div>
            <a href="https://google.com">외부 링크 External Link</a>
          </div>
          <div>
            <Link href="/demo">내부 링크 Internal Link</Link>
          </div>

          <Gap h={1} />

          <div>
            문장 사이에 <a href="https://google.com">링크</a>를 넣을 수
            있습니다.
          </div>
        </GroupBox>

        <Gap h={2} />

        <GroupBox>
          <div>글 사이에</div>
          <ol>
            <li>List 1</li>
            <li>List 2</li>
            <li>
              긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장
            </li>
          </ol>
          <div>리스트</div>

          <Gap h={1} />

          <div>글 사이에</div>
          <ul>
            <li>List 1</li>
            <li>List 2</li>
            <li>
              긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴 문장 긴
              문장
            </li>
          </ul>
          <div>리스트</div>
        </GroupBox>
      </div>
    </div>
  );
}
