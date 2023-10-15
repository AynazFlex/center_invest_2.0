import ScreenWrapper from "./ScreenWrapper";
import ModalWrapper from "./ModalWrapper";
import { Text, Pressable, StyleSheet } from "react-native";

export default function ErrorElem({ callback, error_msg }) {
  return (
    <ScreenWrapper>
      <ModalWrapper>
        <Text style={styles.error__text}>{error_msg}</Text>
        <Pressable style={styles.error__press} onPress={callback}>
          <Text style={styles.error__press_text}>Ок</Text>
        </Pressable>
      </ModalWrapper>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  error__text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#44474F",
    marginBottom: 24,
  },
  error__press: {
    marginLeft: "auto",
  },
  error__press_text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#006E0D",
  },
});
