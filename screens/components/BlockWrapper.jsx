import { View, StyleSheet } from "react-native";

export default function BlockWrapper({ children, styles }) {
  if (styles)
    return <View style={[_styles.container, ...styles]}>{children}</View>;
  return <View style={_styles.container}>{children}</View>;
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 30,
    marginTop: 10,
  },
});
