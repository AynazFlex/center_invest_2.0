import { View, StyleSheet, StatusBar } from "react-native";

export default function ScreenWrapper({ children }) {
  return (
    <View style={_styles.container}>
      {children}
      <StatusBar backgroundColor={"#95F7B9"} style="auto" />
    </View>
  );
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
});
