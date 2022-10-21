import { style } from "@vanilla-extract/css";
import { breakpoints } from "../main.css";

export const nav = style({
  gridArea: "header",
  display: "grid",
  gridTemplateColumns: "1fr 2.5fr 1fr",
  alignItems: "center",
  justifyItems: "center",
  background: "#0F6CBC",
  color: "white",

  "@media": {
    [`screen and (max-width: ${breakpoints.small})`]: {
      fontSize: "0.5rem",
    },
  },
});

export const loginMenuButton = style({
  border: "none",
  padding: 0,
  margin: 0,
  background: "none",
  color: "inherit",
  fontSize: "inherit",
});

export const loginMenuLabel = style({
  ":after": {
    fontFamily: "Ariel",
    content: "▼",
    position: "absolute",
    fontSize: "0.7em",
    display: "inline-block",
    fontWeight: 700,
    paddingLeft: 10,
    paddingTop: "4px",
  },
});

export const loginMenu = style({
  position: "absolute",
  display: "grid",
  backgroundColor: "#fff",
  padding: "10px",
  borderLeft: "1px solid #ccc",
  borderRight: "1px solid #ccc",
  borderBottom: "1px solid #ccc",
  borderRadius: "0 0 5px 5px",
});
