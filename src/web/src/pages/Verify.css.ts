import { style } from "@vanilla-extract/css";

export const formContainer = style({
  border: "1px solid #ccc",
  textAlign: "left",
});

export const fieldContainer = style({
  display: "flex",
  gap: 10,
  flexDirection: "column",
  borderRadius: 5,
  border: "none",
});

export const formGroup = style({
  display: "flex",
  flexDirection: "row",
});

export const formField = style({
  selectors: {
    [`${formGroup} > &`]: {
      flex: 1,
    },
  },
});

export const formControl = style({
  selectors: {
    [`${formGroup} > &`]: {
      flex: 2,
    },
  },
});

export const checkboxGroup = style({
  flex: 2,
  display: "flex",
});

export const checkboxItem = style({
  flex: 1,
});

export const checkbox = style({
  height: 20,
  width: 20,
  accentColor: "#0F6CBC",
});

export const allergiesGroup = style([
  fieldContainer,
  {
    display: "inherit",
  },
]);

export const buttonGroup = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "right",
  margin: 10,
  gap: 10,
});
