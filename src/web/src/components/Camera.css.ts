import { style } from "@vanilla-extract/css";
import { breakpoints } from "../main.css";

export const cameraDisplay = style({
  maxWidth: 1000,
  "@media": {
    [`screen and (max-width: ${breakpoints.small})`]: {
      maxWidth: 320,
    },
  },
});
