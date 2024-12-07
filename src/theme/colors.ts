const palette = {
  // Updated neutral scale with slight green undertone
  neutral100: "#FFFFFF",
  neutral200: "#F7F9F8",
  neutral300: "#E8ECEA",
  neutral400: "#D1D8D4",
  neutral500: "#A7B3AD",
  neutral600: "#7D8A82",
  neutral700: "#5C665F",
  neutral800: "#343C37",
  neutral900: "#1A211D",

  // Primary scale based on #4D956D
  primary100: "#E8F2EC",
  primary200: "#C5E0D0",
  primary300: "#8FC3A4",
  primary400: "#4D956D", // Base color
  primary500: "#3D7656",
  primary600: "#2D573F",

  // Secondary scale complementing the new primary
  secondary100: "#DCE9E4",
  secondary200: "#BCD6CA",
  secondary300: "#91B9A6",
  secondary400: "#628473",
  secondary500: "#416E55",

  // Accent scale with fresh green tones
  accent100: "#D4FFE6",
  accent200: "#B2FFD1",
  accent300: "#95FDC0",
  accent400: "#78FBAE",
  accent500: "#50FF96",

  // Angry scale remains unchanged as it works well
  angry100: "#F2D6CD",
  angry500: "#C03403",

  // Overlay colors updated to use new neutral base
  overlay20: "rgba(26, 33, 29, 0.2)",
  overlay50: "rgba(26, 33, 29, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
} as const
