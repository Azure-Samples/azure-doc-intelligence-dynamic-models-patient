import { style, globalStyle } from "@vanilla-extract/css";

export const button = style({
  borderRadius: "8px",
  border: "1px solid transparent",
  padding: "0.6em 1.2em",
  fontSize: "1em",
  fontWeight: "500",
  fontFamily: "inherit",
  backgroundColor: "#1a1a1a",
  cursor: "pointer",
  transition: "border-color 0.25s",

  selectors: {
    "&:hover": {
      borderColor: "#646cff",
    },

    "&:focus": {
      outline: "4px auto -webkit-focus-ring-color",
    },

    "&:focus-visible": {
      outline: "4px auto -webkit-focus-ring-color",
    },
  },

  "@media": {
    "(prefers-color-scheme: light)": {
      backgroundColor: "#f9f9f9",
    },
  },
});
