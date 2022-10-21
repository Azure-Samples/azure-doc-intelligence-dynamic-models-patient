import { style } from "@vanilla-extract/css";
import { breakpoints } from "../main.css";

export const dragZone = style({
  border: "2px dashed #ccc",
  borderRadius: "20px",
  width: "480px",
  margin: "50px auto",
  padding: "10px",

  "@media": {
    [`screen and (max-width: ${breakpoints.small})`]: {
      width: "320px",
      padding: "10px 0px",
      margin: "20px auto",
    },
  },
});

export const dragZoneHighlight = style([
  dragZone,
  {
    borderColor: "purple",
  },
]);

export const fileUpload = style({
  display: "none",
});

export const messaging = style({
  margin: 0,
});
