import { Series } from "@/api/series";
import Link from "next/link";

const PostHead = ({
  title,
  date,
  series,
}: {
  title: string;
  date: string;
  series?: Series;
}) => {
  return (
    <div className="flex justify-start h-64 items-center flex-col">
      {series && (
        <div>
          <Link href={"/"}>{series.name}</Link>
        </div>
      )}
      <h1>{title}</h1>
      <div className="flex">
        <div className="mr-4">{date}</div>
        <div>1m</div>
      </div>
    </div>
  );
};

export default PostHead;
