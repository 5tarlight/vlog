import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | 알고리즘 가이드",
    default: "알고리즘 가이드",
  },
};

export default function PsGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
