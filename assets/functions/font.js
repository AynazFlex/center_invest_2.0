import vw from "./vw";

const font = (size, weight, color) => ({
  fontFamily: (weight === "500" && "Roboto-Medium") || "Roboto-Regular",
  fontSize: vw(size),
  lineHeight: vw(size),
  fontWeight: weight,
  color,
});

export default font;
