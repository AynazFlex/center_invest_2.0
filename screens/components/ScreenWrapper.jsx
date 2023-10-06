import { View, StyleSheet } from "react-native";

export default function ScreenWrapper({ children }) {
  return <View style={_styles.container}>{children}</View>;
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2f136",
    paddingHorizontal: 10,
  },
});
