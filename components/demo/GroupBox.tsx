import { ReactNode } from "react";

export default function GroupBox({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="border border-gray-300 rounded-lg p-4">{children}</div>
  );
}
