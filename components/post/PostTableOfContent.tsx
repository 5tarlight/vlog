import Link from "next/link";

const PostTableOfContent = ({
  tableOfContent,
}: {
  tableOfContent: string[];
}) => {
  return (
    <div className="border-l-[1px] border-gray-300 pl-4 sticky">
      <div className="text-lg font-semibold mb-2">Table of Content</div>
      <ul>
        {tableOfContent.map((content, index) => (
          <li key={index} className="mb-1">
            <Link href={`#${content}`} className="text-gray-700">
              {content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostTableOfContent;
