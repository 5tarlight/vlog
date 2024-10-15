import { headers } from "next/headers";

export const getBaseUrl = () => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
};

export const getUrl = (path: string) => {
  return `${getBaseUrl()}${path}`;
};
