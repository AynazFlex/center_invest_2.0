import BottomNav from "./components/BottomNav";
import ScreenWrapper from "./components/ScreenWrapper";
import { Text, StyleSheet, View } from "react-native";
import BankIcon from "./components/BankIcon";

export default function Notifications({ navigation }) {
  return (
    <ScreenWrapper>
      <View style={styles.mess}>
        <View style={styles.mess__body}>
          <Text style={styles.mess__body_title}>Центр-инвест</Text>
          <Text style={styles.mess__body_body}>
            Ваше обращение №15446 рассмотрено. Категория операции «Ремонт61»
            изменена с Аквариум на Автозапчасти
          </Text>
          <Text style={styles.mess__body_time}>01:66 06.10.2023</Text>
        </View>
        <View style={styles.mess__icon}>
          <BankIcon color={"#EFEDF1"} />
        </View>
      </View>
      <BottomNav navigation={navigation} active_sreen="Notifications" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mess: {
    marginTop: 16,
  },

  mess__body: {
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#EFEDF1",
    marginRight: 44,
  },

  mess__body_title: {
    fontSize: 12,
    color: "#44474F",
    fontWeight: "500",
    marginBottom: 8,
  },

  mess__body_body: {
    fontSize: 12,
    color: "#44474F",
    fontWeight: "400",
    marginBottom: 8,
  },

  mess__body_time: {
    fontSize: 12,
    color: "#44474F",
    fontWeight: "400",
    textAlign: "right",
  },

  mess__icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
