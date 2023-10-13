import ScreenWrapper from "./components/ScreenWrapper";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCard } from "../store/dataReducer";
import LoadElem from "./components/LoadElem";
import { Svg, Path } from "react-native-svg";
import CashbackIcon from "./components/CashbackIcon";
import { fetchChooseCardCashBack } from "../store/api";

const Item = ({ product_type, isChoose, handleChooseCashBack }) => {
  return (
    <Pressable
      style={styles.cashbacks_item}
      onPress={() => handleChooseCashBack(product_type)}
    >
      <View style={styles.cashbacks_item_icon_wrapper}>
        <CashbackIcon size={24} name={product_type} />
      </View>
      <Text style={styles.cashbacks_item_text}>{product_type}</Text>
      {isChoose && (
        <View style={styles.cashbacks_item_check}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <Path
              d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"
              fill="white"
            />
          </Svg>
        </View>
      )}
      {!isChoose && <View style={styles.cashbacks_item_no_check} />}
    </Pressable>
  );
};

// const cashbacks = [
//   "автозапчасти",
//   "аквариум",
//   "видеоигры",
//   "закуски и приправы",
//   "напитки",
//   "образование",
//   "одежда",
//   "продукты питания",
//   "уборка",
//   "электроника",
// ];

export default function Card({ navigation, route }) {
  const { account_number } = route.params;
  const { isPending, error_msg, card, access_token, token_type } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [cash, setCash] = useState([]);
  const [isLoading, setLoad] = useState(false);

  const handleChooseCashBack = (product_type) => {
    if (cash.includes(product_type)) {
      setCash((prev) => prev.filter((i) => i !== product_type));
      return;
    }
    if (cash.length === 3) return;
    setCash((prev) => [...prev, product_type]);
  };

  const isDone = cash.length === 3;

  useFocusEffect(
    useCallback(() => {
      dispatch(getCard(account_number));

      return () => setCash([]);
    }, [])
  );

  if (!card || isPending) return <LoadElem />;

  const handlePress = async () => {
    setLoad(true);
    try {
      const cashback = card.cashbacks.filter(({ product_type }) =>
        cash.includes(product_type)
      );

      await fetchChooseCardCashBack({
        account_number,
        access_token,
        token_type,
        cashback,
      });

      navigation.goBack();
    } catch {
      alert("error");
    } finally {
      setLoad(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.top_nav}>
        <Pressable onPress={() => navigation.goBack()}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <Path
              d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
              fill="#44474F"
            />
          </Svg>
        </Pressable>
        <Text style={styles.top_nav_text}>Выбор категорий кешбека</Text>
      </View>
      <FlatList
        style={styles.cashbacks_list}
        showsVerticalScrollIndicator={false}
        data={card.cashbacks}
        renderItem={({ item: { product_type } }) => (
          <Item
            handleChooseCashBack={handleChooseCashBack}
            product_type={product_type}
            isChoose={cash.includes(product_type)}
          />
        )}
        keyExtractor={({ product_type }) => {
          return product_type;
        }}
      />
      <Pressable
        disabled={!isDone || isLoading}
        style={[styles.done, { opacity: isDone ? 1 : 0.6 }]}
        onPress={handlePress}
      >
        {isLoading || (
          <Text style={styles.done_text}>
            {isDone ? "Готово" : `Выберите ${3 - cash.length} кэшбэк(а)`}
          </Text>
        )}
        {isLoading && <ActivityIndicator size={14} color="white" />}
      </Pressable>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  top_nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
  },
  top_nav_text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1B1B1F",
  },
  cashbacks_list: {
    marginTop: 16,
  },
  cashbacks_item_icon_wrapper: {
    padding: 10,
  },
  cashbacks_item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  cashbacks_item_text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1B1B1F",
  },
  cashbacks_item_check: {
    marginLeft: "auto",
    backgroundColor: "#006E0D",
    borderRadius: 2,
  },
  cashbacks_item_no_check: {
    width: 20,
    height: 20,
    borderColor: "#44474F",
    borderRadius: 2,
    borderStyle: "solid",
    borderWidth: 2,
    marginLeft: "auto",
  },
  done: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#006E0D",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  done_text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFF",
  },
});
