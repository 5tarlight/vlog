import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { getUrl } from "@/lib/utils/getUrl";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const param = Object.fromEntries(query.entries());

  const { color, bg, title, sub, ts, ss } = param;

  const font = await fetch(getUrl("/font/gotgam.ttf")).then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          color: `#${color || "000"}`,
          background: `#${bg || "fff"}`,
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          fontFamily: "gotgam",
        }}
      >
        <span
          style={{
            fontSize: parseInt(ts || "72"),
            fontWeight: "bolder",
            marginBottom: 20,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: parseInt(ss || "48"),
          }}
        >
          {sub}
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "gotgam",
          data: font,
          style: "normal",
        },
      ],
    }
  );
}
