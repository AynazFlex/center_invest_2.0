import { StyleSheet, View } from "react-native";

export default function ModalWrapper({ children }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.32)",
  },
  container: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: "#E9E7EC",
  },
});
