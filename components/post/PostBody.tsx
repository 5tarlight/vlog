import { getPostsInSeries, getSeries } from "@/api/series";
import PostContent from "./PostContent";
import PostSeries from "./PostSeries";
import PostTableOfContent from "./PostTableOfContent";

interface Props {
  content: string;
  series?: number;
}

const PostBody = ({ content, series }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex justify-center gap-16">
        <div className="hidden lg:block w-[16rem]"></div>
        <div className="max-w-[700px] w-full">
          {series != undefined && (
            <PostSeries
              series={getSeries(series)!!}
              posts={getPostsInSeries(series)}
            />
          )}
          <PostContent content={content} />
        </div>
        <div className="hidden lg:block w-[16rem] ">
          <PostTableOfContent />
        </div>
      </div>
    </div>
  );
};

export default PostBody;
