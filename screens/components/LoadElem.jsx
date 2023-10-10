import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadElem() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={24} color="#95F7B9" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
