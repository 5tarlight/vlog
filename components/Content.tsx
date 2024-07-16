import { ReactNode } from "react";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full content-body">{children}</div>
    </div>
  );
}
