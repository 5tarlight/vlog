import { headers } from "next/headers";
import { isDev } from "./isDev";

export const getBaseUrl = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
};

export const getUrl = async (path: string) => {
  return new URL(path, await getBaseUrl()).toString();
};

export const getStaticUrl = (path: string) => {
  return (isDev ? "http://localhost:3000" : "https://post.yeahx4.me") + path;
};
