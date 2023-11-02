import { View, StyleSheet } from "react-native";
import vw from "../../assets/functions/vw";

export default function IconWrapper({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: vw(50),
    width: vw(50),
    height: vw(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3cb93f",
  },
});
