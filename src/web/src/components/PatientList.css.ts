import { style } from "@vanilla-extract/css";
import { breakpoints } from "../main.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: 500,

  [`screen and (max-width: ${breakpoints.small})`]: {
    width: "320px",
  },
});

export const group = style({
  flex: 1,
  display: "flex",
  padding: 10,
  border: "1px solid #ccc",
  alignItems: "center",

  selectors: {
    "&:nth-child(even)": {
      backgroundColor: "#f9f9f9",
    },
  },
});

export const groupHeader = style([
  group,
  {
    justifyContent: "space-between",
  },
]);

export const item = style({
  flex: 1,
});
