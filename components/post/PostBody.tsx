import PostContent from "./PostContent";
import PostSeries from "./PostSeries";

interface Props {
  content: string;
  series?: number;
}

const PostBody = ({ content, series }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex justify-between">
        <div className="hidden md:block">
          <PostSeries series={series} />
        </div>
        <div className="max-w-[800px] w-full">
          <PostContent content={content} />
        </div>
        <div className="hidden md:block">Index</div>
      </div>
    </div>
  );
};

export default PostBody;
