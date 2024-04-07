import Gap from "@/components/util/Gap";
import GroupBox from "@/components/demo/GroupBox";

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
      </div>
    </div>
  );
}
