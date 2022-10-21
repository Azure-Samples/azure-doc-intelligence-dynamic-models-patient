import { globalStyle, style } from "@vanilla-extract/css";

export const breakpoints = {
  small: "400px",
};

export const hidden = style({
  display: "none",
});

export const main = style({
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "2rem",
  textAlign: "center",

  "@media": {
    [`screen and (max-width: ${breakpoints.small})`]: {
      maxWidth: 320,
      padding: 0,
      fontSize: "0.8em",
    },
  },
});

globalStyle("#root", {
  margin: 0,
  display: "grid",
  minWidth: "320px",
  minHeight: "100vh",
  gridTemplateRows: "auto 1fr auto",
  gridTemplateAreas: `"header"
   "main"
   "footer"`,
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

globalStyle("a.logout", {
  color: "#fff",
});

globalStyle("a:hover", {
  color: "#535bf2",

  "@media": {
    "(prefers-color-scheme: light)": {
      color: "#747bff",
    },
  },
});

globalStyle("table", {
  width: "100%",
});

globalStyle("table tr:nth-child(odd)", {
  backgroundColor: "#f5f5f5",
});
