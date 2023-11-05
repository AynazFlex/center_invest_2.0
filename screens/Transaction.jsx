import { View, StyleSheet, Pressable, Text } from "react-native";
import ScreenWrapper from "./components/ScreenWrapper";
import { Path, Svg } from "react-native-svg";
import CashbackIcon from "./components/CashbackIcon";
import BankIcon from "./components/BankIcon";
import { convertMonth } from "../store/dataReducer";
import vw from "../assets/functions/vw";
import font from "../assets/functions/font";

export default function Transaction({ navigation, route }) {
  const { transaction, bank, account_number } = route.params;
  const date = new Date(transaction.time);
  const time = `${date.getDate()} ${
    convertMonth[date.getMonth()]
  } ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;

  return (
    <ScreenWrapper>
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.goBack()}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={vw(24)}
            height={vw(24)}
            viewBox="0 0 24 24"
            fill="none"
          >
            <Path
              d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
              fill="#44474F"
            />
          </Svg>
        </Pressable>
        <Text style={styles.nav__time}>{time}</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.main__category_icon}>
          <CashbackIcon size={vw(24)} name={transaction.category} />
        </View>
        <Text style={styles.main__name}>{transaction.name}</Text>
        <Text style={styles.main__category}>{transaction.category}</Text>
        <View style={styles.main__total}>
          <Text style={styles.main__value}>-{transaction.value} ₽</Text>
          <Text style={styles.main__back}>+{transaction.back}</Text>
        </View>
      </View>
      <Text style={styles.chak}>Счет списания</Text>
      <View style={styles.bank}>
        <BankIcon isCenter={bank === "Центр-инвест"} />
        <View>
          <Text style={styles.bank__name}>{bank}</Text>
          <Text style={styles.bank__number}>{account_number}</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },

  nav__time: {
    ...font(16, "400", "#1B1B1F"),
  },

  main: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 32,
  },

  main__category_icon: {
    borderRadius: 32,
    padding: 16,
    backgroundColor: "#EFEDF1",
    marginBottom: 12,
  },

  main__name: {
    ...font(22, "400", "#1B1B1F"),
    textAlign: "center",
  },

  main__category: {
    ...font(12, "400", "#44474F"),
  },

  main__total: {
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },

  main__value: {
    ...font(32, "400", "#1B1B1F"),
  },

  main__back: {
    ...font(12, "500", "#201C00"),
    backgroundColor: "#FBE505",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
  },

  chak: {
    ...font(14, "500", "#44474F"),
    marginBottom: 8,
  },

  bank: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EFEDF1",
    borderRadius: 18,
  },

  bank__name: {
    ...font(14, "500", "#1B1B1F"),
  },

  bank__number: {
    ...font(12, "400", "#44474F"),
  },
});
