import { createTheme, MantineColorsTuple } from "@mantine/core";

const iteBlue: MantineColorsTuple = [
  "#eff3fb",
  "#dde4ef",
  "#b6c6e1",
  "#8da7d4",
  "#6b8dc9",
  "#557cc3",
  "#4a74c1",
  "#3b62ab",
  "#325799",
  "#1d3a69",
];

export const iteGray: MantineColorsTuple = [
  "#f5f5f5",
  "#e7e7e7",
  "#cdcdcd",
  "#b1b1b1",
  "#9a9a9a",
  "#8b8b8b",
  "#838383",
  "#717171",
  "#646464",
  "#404041",
];

export const theme = createTheme({
  fontFamily: "Noto Sans",
  colors: {
    iteBlue,
    iteGray,
  },
  primaryColor: "iteBlue",
  primaryShade: 8,
  black: iteGray[9],
  defaultRadius: "xs",
});
