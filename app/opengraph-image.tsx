import { ImageResponse } from "next/og";

export const alt = "Deemo Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const darkBackground = "#2C2F33";
  const whiteColor = "#FFFFFF";
  const secondaryTextColor = "#A0A0A0";

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(to bottom right, ${darkBackground}, #1A1C1E)`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-20%",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-20%",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.03)",
            filter: "blur(120px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50px",
              background: darkBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `4px solid ${whiteColor}`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <span
              style={{
                fontSize: "140px",
                fontWeight: "900",
                color: whiteColor,
                lineHeight: 1,
              }}
            >
              D
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                color: whiteColor,
                letterSpacing: "-0.03em",
              }}
            >
              DEEMO
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "500",
                color: secondaryTextColor,
              }}
            >
              Frontend Developer Portfolio
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
