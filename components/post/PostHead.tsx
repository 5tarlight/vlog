import { Series } from "@/api/series";
import Link from "next/link";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

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
      <div className="flex text-gray-600">
        <div className="mr-4 flex">
          <FaRegCalendarAlt className="mt-[0.1rem]" />
          <div className="ml-2">{date}</div>
        </div>
        <div className="ml-8 flex">
          <FaRegClock className="mt-[0.2rem]" />
          <div className="ml-2">1m</div>
        </div>
      </div>
    </div>
  );
};

export default PostHead;
