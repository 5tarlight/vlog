import Link from "next/link";

export default function PostLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const bojBase = "https://www.acmicpc.net/problem/";

  if (href.startsWith(bojBase) && href === text) {
    const problem = href.slice(bojBase.length);
    text = `BOJ - ${problem}번`;
  }

  return <Link href={href}>{text}</Link>;
}
