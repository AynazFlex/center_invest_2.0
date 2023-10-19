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
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCards, setLogout } from "../store/dataReducer";
import LoadElem from "./components/LoadElem";
import CashbackIcon from "./components/CashbackIcon";
import BankIcon from "./components/BankIcon";
import ErrorElem from "./components/ErrorElem";
import { fetchLogout } from "../store/api";

const Item = ({ item, navigation }) => (
  <View style={styles.card__wrapper}>
    <View style={styles.card__header}>
      {item.bank === "Центр-инвест" ? (
        <BankIcon />
      ) : (
        <View
          style={{
            backgroundColor: "#FAF9FD",
            width: 36,
            height: 36,
            borderRadius: 18,
          }}
        ></View>
      )}
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
            <CashbackIcon size={16} name={product_type} />
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
  const { cards, error_msg, isPending, access_token, token_type } = useSelector(
    ({ data }) => data
  );
  const [local_error, setError] = useState(null);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getCards());
    }, [])
  );

  const logout = async () => {
    try {
      await fetchLogout({ access_token, token_type });
      dispatch(setLogout());
      navigation.push("Home");
    } catch ({ response }) {
      setError(response.data.detail || "Error :/");
    }
  };

  useGoHome(navigation, logout);

  if (local_error)
    return (
      <ErrorElem
        callback={() => {
          setError(null);
        }}
        error_msg={local_error}
      />
    );

  if (error_msg) return <ErrorElem callback={logout} error_msg={error_msg} />;

  if (!cards || isPending) {
    return <LoadElem />;
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Image
          width={48}
          height={48}
          style={styles.header__img}
          source={require("../assets/image/user_icon.png")}
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
    marginRight: 8,
  },

  header__info: {},

  header__user_name: {
    fontSize: 24,
    fontWeight: "400",
    color: "#1B1B1F",
  },

  header__user_cashback: {
    fontSize: 14,
    fontWeight: "400",
    color: "#44474F",
  },

  accounts: {
    marginTop: 32,
    fontSize: 22,
    fontWeight: "400",
    color: "#1B1B1F",
    marginBottom: 16,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cards_list: {
    marginBottom: 66,
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
    color: "#1B1B1F",
    fontSize: 16,
    fontWeight: "500",
  },

  card__no: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "400",
    color: "#44474F",
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

  card__cashback_title: {
    fontSize: 12,
    fontWeight: "400",
    color: "#44474F",
  },

  card__button: {
    marginTop: 12,
    borderRadius: 8,
    borderColor: "#75777F",
    borderStyle: "solid",
    borderWidth: 1,
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  card__button_text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1B1B1F",
  },
});
