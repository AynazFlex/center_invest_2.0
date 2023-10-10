import { View, StyleSheet, ActivityIndicator } from "react-native";
import ScreenWrapper from "./ScreenWrapper";

export default function LoadElem() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ActivityIndicator size={50} color="#95F7B9" />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
