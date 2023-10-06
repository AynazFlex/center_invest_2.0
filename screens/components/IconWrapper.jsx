import { View, StyleSheet } from "react-native";

export default function IconWrapper({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3cb93f",
  },
});
