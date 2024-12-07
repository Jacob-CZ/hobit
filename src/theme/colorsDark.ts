const palette = {
  // Neutral scale remains unchanged
  neutral900: "#FFFFFF",
  neutral800: "#F7F9F8",
  neutral700: "#E8ECEA",
  neutral600: "#D1D8D4",
  neutral500: "#A7B3AD",
  neutral400: "#7D8A82",
  neutral300: "#5C665F",
  neutral200: "#343C37",
  neutral100: "#1A211D",

  // New primary scale based on #4D956D
  primary600: "#E8F2EC", // Lightest
  primary500: "#C5E0D0",
  primary400: "#8FC3A4",
  primary300: "#4D956D", // Base color
  primary200: "#3D7656",
  primary100: "#2D573F", // Darkest

  // Adjusted secondary scale to complement new primary
  secondary500: "#DCE9E4",
  secondary400: "#BCD6CA",
  secondary300: "#91B9A6",
  secondary200: "#628473",
  secondary100: "#416E55",

  // Adjusted accent scale to complement new primary
  accent500: "#D4FFE6",
  accent400: "#B2FFD1",
  accent300: "#95FDC0",
  accent200: "#78FBAE",
  accent100: "#50FF96",

  // Angry scale remains unchanged
  angry100: "#F2D6CD",
  angry500: "#C03403",

  // Overlay colors remain unchanged
  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
