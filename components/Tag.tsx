import Link from "next/link";

export default function Tag({ children }: { children: string[] }) {
  return (
    <div className="flex tag-container">
      {children.map((tag, i) => (
        <Link href={`/tag/${tag}`} key={i}>
          <div className="post-tag">{tag}</div>
        </Link>
      ))}
    </div>
  );
}
