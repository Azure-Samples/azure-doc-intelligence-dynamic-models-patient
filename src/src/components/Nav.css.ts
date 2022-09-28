import { style } from "@vanilla-extract/css";

export const nav = style({
  gridArea: "header",
  display: "grid",
  gridTemplateColumns: "1fr 2.5fr 1fr",
  alignItems: "center",
  justifyItems: "center",
});

export const loginProviders = style({
  display: "grid",
});
