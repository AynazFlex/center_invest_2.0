import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const vw = (size) => (size / 360) * Math.min(screenWidth, screenHeight);

export default vw;
