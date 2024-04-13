import { getPostsInSeries, getSeries } from "@/api/series";
import PostSeries from "./PostSeries";
import PostTableOfContent from "./PostTableOfContent";
import { renderContent } from "@/api/renderContent";

interface Props {
  content: string;
  series?: number;
  postid: number;
}

const PostBody = ({ content, series, postid }: Props) => {
  const { graph, tableOfContent } = renderContent(content);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex justify-center gap-16">
        <div className="hidden lg:block w-[16rem]"></div>
        <div className="max-w-[700px] w-full">
          {series != undefined && (
            <PostSeries
              series={getSeries(series)!!}
              posts={getPostsInSeries(series)}
              postid={postid}
            />
          )}
          {/* <PostContent content={content} /> */}
          <div className="w-full">{graph}</div>
        </div>
        <div className="hidden lg:block w-[16rem] ">
          <PostTableOfContent tableOfContent={tableOfContent} />
        </div>
      </div>
    </div>
  );
};

export default PostBody;
