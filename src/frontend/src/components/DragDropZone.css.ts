import { style } from "@vanilla-extract/css";

export const dragZone = style({
  border: "2px dashed #ccc",
  borderRadius: "20px",
  width: "480px",
  margin: "50px auto",
  padding: "20px",

  selectors: {
    "&.highlight": {
      borderColor: "purple",
    },
  },
});

export const fileUpload = style({
  display: "none",
});
