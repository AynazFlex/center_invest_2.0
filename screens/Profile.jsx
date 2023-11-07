import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  FlatList,
} from "react-native";
import ScreenWrapper from "./components/ScreenWrapper";
import useGoHome from "./custom_hooks/useGoHome";
import BottomNav from "./components/BottomNav";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards, setLogout } from "../store/dataReducer";
import LoadElem from "./components/LoadElem";
import CashbackIcon from "./components/CashbackIcon";
import BankIcon from "./components/BankIcon";
import ErrorElem from "./components/ErrorElem";
import vw from "../assets/functions/vw";
import font from "../assets/functions/font";
import border from "../assets/functions/border";

const Item = ({ item, navigation }) => (
  <View style={styles.card__wrapper}>
    <View style={styles.card__header}>
      <BankIcon isCenter={item.bank === "Центр-инвест"} />
      <View>
        <Text style={styles.card__bank}>{item.bank}</Text>
        {!item.can_choose_cashback && !item.cashbacks.length && (
          <Text style={styles.card__no}>Банк не участвует в программе</Text>
        )}
      </View>
    </View>
    {!!item.cashbacks.length && (
      <View style={styles.card__cashbacks}>
        {item.cashbacks.map(({ product_type, value }) => (
          <View key={product_type} style={styles.card__cashback_item}>
            <CashbackIcon size={vw(16)} name={product_type} />
            <Text style={styles.card__cashback_title}>
              {product_type} {value}%
            </Text>
          </View>
        ))}
      </View>
    )}
    {item.can_choose_cashback && (
      <Pressable
        style={styles.card__button}
        onPress={() =>
          navigation.navigate("Card", {
            account_number: item.account_number,
          })
        }
      >
        <Text style={styles.card__button_text}>
          {item.cashbacks.length ? "Поменять" : "Выбрать"} категории
        </Text>
      </Pressable>
    )}
  </View>
);

export default function Profile({ navigation }) {
  const { cards, error_msg, isAuth } = useSelector(({ data }) => data);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      cards || (isAuth && dispatch(getCards()));
    }, [cards, isAuth])
  );

  useEffect(() => {
    isAuth || navigation.push("Home");
  }, [isAuth]);

  useGoHome(navigation, () => dispatch(setLogout()));

  if (error_msg)
    return (
      <ErrorElem callback={() => dispatch(setLogout())} error_msg={error_msg} />
    );

  if (!cards) {
    return <LoadElem />;
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Image
          style={styles.header__img}
          source={require("../assets/image/people.png")}
        />
        <View style={styles.header__info}>
          <Text style={styles.header__user_name}>Александр</Text>
        </View>
      </View>
      <Text style={styles.accounts}>Счета</Text>
      <FlatList
        style={styles.cards_list}
        showsVerticalScrollIndicator={false}
        data={cards}
        renderItem={({ item }) => <Item navigation={navigation} item={item} />}
        keyExtractor={({ account_number }) => account_number}
      />
      <BottomNav navigation={navigation} active_sreen="Profile" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  header__img: {
    width: vw(48),
    height: vw(48),
    marginRight: 8,
  },

  header__user_name: {
    ...font(24, "400", "#1B1B1F"),
  },

  header__user_cashback: {
    ...font(14, "400", "#44474F"),
  },

  accounts: {
    marginTop: 32,
    ...font(22, "400", "#1B1B1F"),
    marginBottom: 16,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cards_list: {
    marginBottom: vw(32) + 32,
  },

  card__wrapper: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#EFEDF1",
    marginBottom: 16,
  },

  card__header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  card__bank: {
    ...font(16, "500", "#1B1B1F"),
  },

  card__cashbacks: {
    marginTop: 12,
    gap: 6,
    flexWrap: "wrap",
    flexDirection: "row",
  },

  card__cashback_item: {
    borderRadius: 16,
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: "row",
    backgroundColor: "#FAF9FD",
    flexWrap: "nowrap",
  },
  card__no: {
    ...font(12, "400", "#44474F"),
  },

  card__cashback_title: {
    ...font(12, "400", "#44474F"),
  },

  card__button: {
    marginTop: 12,
    ...border(1, "solid", "#75777F"),
    borderRadius: 8,
    height: vw(32),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  card__button_text: {
    ...font(12, "500", "#1B1B1F"),
  },
});
