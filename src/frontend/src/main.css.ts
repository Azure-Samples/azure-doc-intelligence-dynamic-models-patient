import { globalStyle, style } from "@vanilla-extract/css";

export const hidden = style({
  display: "none",
});

globalStyle("#root", {
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "2rem",
  textAlign: "center",
});

globalStyle(":root", {
  fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",

  colorScheme: "light dark",
  color: "rgba(255, 255, 255, 0.87)",
  backgroundColor: "#242424",

  fontSynthesis: "none",
  textRendering: "optimizeLegibility",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  WebkitTextSizeAdjust: "100%",

  "@media": {
    "(prefers-color-scheme: light)": {
      color: "#213457",
      backgroundColor: "#fff",
    },
  },
});

globalStyle("a", {
  fontWeight: 500,
  color: "#646cff",
  textDecoration: "inherit",
});

globalStyle("a:hover", {
  color: "#535bf2",

  "@media": {
    "(prefers-color-scheme: light)": {
      color: "#747bff",
    },
  },
});

globalStyle("body", {
  margin: 0,
  display: "flex",
  placeItems: "center",
  minWidth: "320px",
  minHeight: "100vh",
});
