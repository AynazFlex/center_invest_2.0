import ModalWrapper from "./ModalWrapper";
import { View, Text, Pressable, StyleSheet, StatusBar } from "react-native";
import font from "../../assets/functions/font";

export default function ErrorElem({ callback, error_msg }) {
  return (
    <View style={styles.error}>
      <ModalWrapper>
        <Text style={styles.error__text}>{error_msg}</Text>
        <Pressable style={styles.error__press} onPress={callback}>
          <Text style={styles.error__press_text}>Ок</Text>
        </Pressable>
      </ModalWrapper>
      <StatusBar backgroundColor={"#95F7B9"} style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    flex: 1,
    backgroundColor: "white",
  },
  error__text: {
    ...font(14, "400", "#44474F"),
    marginBottom: 24,
  },
  error__press: {
    marginLeft: "auto",
  },
  error__press_text: {
    ...font(14, "500", "#006E0D"),
  },
});
