import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const responsiveWidth = (percent) => (width * percent) / 100;
export const responsiveHeight = (percent) => (height * percent) / 100;
export const responsiveFont = (percent) =>
  Math.sqrt(width * width + height * height) * (percent / 100);