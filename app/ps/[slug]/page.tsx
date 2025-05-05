import { redirect } from "next/navigation";

export default async function PsPostRedirection({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  redirect("/ps-guide/" + (await params).slug);
}
