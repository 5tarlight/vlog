import { getImage } from "@/api/imageCdn";
import { PostMeta } from "@/api/postMeta";
import Link from "next/link";

export default function PostBlock({
  title,
  href,
  cover,
}: {
  title: string;
  href: string;
  cover?: string;
}) {
  return (
    <Link href={href} className="text-black no-underline hover:no-underline">
      <div className="w-[300px] h-[200px] flex flex-col rounded-lg border-2 border-gray-300 m-4">
        <div
          className="w-full h-[80%] rounded-t-md"
          style={{
            backgroundImage: `url(${getImage(
              cover || "thumbnail/yeahx4.png"
            )})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="p-4">{title}</div>
      </div>
    </Link>
  );
}
