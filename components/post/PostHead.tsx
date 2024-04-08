import { Series } from "@/api/series";
import Link from "next/link";

const PostHead = ({
  title,
  description,
  date,
  series,
}: {
  title: string;
  description: string;
  date: string;
  series?: Series;
}) => {
  return (
    <div className="flex justify-start min-h-48 mb-16 items-center flex-col w-full border-b-2 border-b-gray-300">
      {series && (
        <div className="font-bold mb-[-0.5rem]">
          <Link href={"/"}>{series.name}</Link>
        </div>
      )}
      <h1>{title}</h1>
      <div className="mb-4 text-gray-500">{description}</div>
      <div className="flex">
        <div className="mr-4">{date}</div>
        <div>1m</div>
      </div>
    </div>
  );
};

export default PostHead;
