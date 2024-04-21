import { TableOfContent } from "@/api/renderContent";
import Link from "next/link";

const PostTableOfContent = ({
  tableOfContent,
}: {
  tableOfContent: TableOfContent[];
}) => {
  return (
    <div className="border-l-[1px] border-gray-300 pl-4 sticky top-16">
      <div className="text-lg font-semibold mb-2">Table of Content</div>
      <ul>
        {tableOfContent.map((content, index) => (
          <li
            key={index}
            className="mb-1"
            style={{ marginLeft: `${(content.level - 1) / 2}rem` }}
          >
            <Link href={`#${content.text}`} className="text-gray-700">
              {content.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostTableOfContent;
