import BottomNav from "./components/BottomNav";
import ScreenWrapper from "./components/ScreenWrapper";
import { Text, StyleSheet } from "react-native";

export default function Notification({ navigation }) {
  return (
    <ScreenWrapper>
      <Text>Уведомление</Text>
      <BottomNav navigation={navigation} active_sreen="Notifications" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'flex-end',
        marginTop: 16
    },

    mess_body: {
        flexGrow: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
    }
})