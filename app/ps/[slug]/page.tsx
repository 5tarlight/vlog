import { redirect } from "next/navigation";

export default function PsPostRedirection({
  params,
}: {
  params: { slug: string };
}) {
  redirect("/ps-guide/" + params.slug);
}
