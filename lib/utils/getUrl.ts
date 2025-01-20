import { headers, type UnsafeUnwrappedHeaders } from "next/headers";
import { join } from "path";

export const getBaseUrl = async () => {
  const headersList = (await headers()) as unknown as UnsafeUnwrappedHeaders;
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
};

export const getUrl = async (path: string) => {
  return join(await getBaseUrl(), path);
};
