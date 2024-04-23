import { TableOfContent } from "@/api/renderContent";
import Link from "next/link";

const PostTableOfContent = ({
  tableOfContent,
}: {
  tableOfContent: TableOfContent[];
}) => {
  return (
    <div className="border-l-[1px] border-gray-300 pl-4 sticky top-16">
      <div className="text-lg font-semibold mb-2 flex flex-col">
        Table of Content
      </div>
      {tableOfContent.map((content, index) => (
        <div
          style={{
            marginLeft: `${content.level - 1.5}rem`,
            marginBottom: "0.25rem",
          }}
          key={index}
        >
          <Link href={`#${content.text}`} className="text-gray-700">
            {content.text}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostTableOfContent;
