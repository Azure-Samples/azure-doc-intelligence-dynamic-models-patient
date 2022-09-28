import { style } from "@vanilla-extract/css";

export const fieldContainer = style({
  display: "flex",
  gap: 10,
  flexDirection: "column",
  borderRadius: 5,
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

export const genderGroup = style([
  fieldContainer,
  {
    display: "grid",
    gridTemplateColumns: "20% 20% 60%",
    justifyItems: "left",
  },
]);

export const pronounsGroup = style([
  fieldContainer,
  {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    justifyItems: "left",
  },
]);

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

export const button = style({
  padding: 10,
  borderRadius: 5,
  backgroundColor: "#f5f5f5",
  color: "#000",
  cursor: "pointer",
  fontSize: 16,
});

export const buttonPrimary = style([
  button,
  {
    backgroundColor: "#4caf50",
    color: "#fff",
  },
]);
