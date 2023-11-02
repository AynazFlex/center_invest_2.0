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
import {
  getCard,
  resetDone,
  resetError,
  setNewCashbacks,
} from "../store/dataReducer";
import LoadElem from "./components/LoadElem";
import { Svg, Path } from "react-native-svg";
import CashbackIcon from "./components/CashbackIcon";
import ErrorElem from "./components/ErrorElem";
import { useEffect } from "react";
import vw from "../assets/functions/vw";
import font from "../assets/functions/font";

const Item = ({ product_type, isChoose, handleChooseCashBack }) => {
  return (
    <Pressable
      style={styles.cashbacks_item}
      onPress={() => handleChooseCashBack(product_type)}
    >
      <View style={styles.cashbacks_item_icon_wrapper}>
        <CashbackIcon size={vw(24)} name={product_type} />
      </View>
      <Text style={styles.cashbacks_item_text}>{product_type}</Text>
      {isChoose && (
        <View style={styles.cashbacks_item_check}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={vw(20)}
            height={vw(20)}
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

export default function Card({ navigation, route }) {
  const { account_number } = route.params;
  const { isPending, error_msg, card, isDone } = useSelector(
    ({ data }) => data
  );
  const dispatch = useDispatch();
  const [cash, setCash] = useState([]);

  const handleChooseCashBack = (product_type) => {
    if (cash.includes(product_type)) {
      setCash((prev) => prev.filter((i) => i !== product_type));
      return;
    }
    if (cash.length === 3) return;
    setCash((prev) => [...prev, product_type]);
  };

  const success = cash.length === 3;

  useFocusEffect(
    useCallback(() => {
      dispatch(getCard(account_number));

      return () => {
        setCash([]);
      };
    }, [])
  );

  useEffect(() => {
    if (!isDone) return;
    navigation.goBack();
    dispatch(resetDone());
  }, [isDone]);

  if (error_msg)
    return (
      <ErrorElem
        callback={() => {
          navigation.goBack();
          dispatch(resetError());
        }}
        error_msg={error_msg}
      />
    );

  if (!card) return <LoadElem />;

  const handlePress = () => {
    const cashback = card.cashbacks.filter(({ product_type }) =>
      cash.includes(product_type)
    );

    dispatch(
      setNewCashbacks({
        account_number,
        cashback,
      })
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.top_nav}>
        <Pressable
          onPress={() => {
            navigation.goBack();
            dispatch(resetDone());
          }}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={vw(20)}
            height={vw(20)}
            viewBox="0 0 24 24"
            fill="none"
          >
            <Path
              d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
              fill="#44474F"
            />
          </Svg>
        </Pressable>
        <Text style={styles.top_nav_text}>Выбор категорий кешбэка</Text>
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
        disabled={!success || isPending}
        style={[styles.done, { opacity: success ? 1 : 0.6 }]}
        onPress={handlePress}
      >
        {isPending || (
          <Text style={styles.done_text}>
            {success ? "Готово" : `Выберите ${3 - cash.length} кешбэк(а)`}
          </Text>
        )}
        {isPending && <ActivityIndicator size={vw(14)} color="white" />}
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
    ...font(16, "400", "#1B1B1F"),
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
    ...font(16, "500", "#1B1B1F"),
  },
  cashbacks_item_check: {
    marginLeft: "auto",
    backgroundColor: "#006E0D",
    borderRadius: 2,
  },
  cashbacks_item_no_check: {
    width: vw(20),
    height: vw(20),
    borderColor: "#44474F",
    borderRadius: 2,
    borderStyle: "solid",
    borderWidth: 2,
    marginLeft: "auto",
  },
  done: {
    height: vw(40),
    borderRadius: 10,
    backgroundColor: "#006E0D",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  done_text: {
    ...font(14, "500", "#FFF"),
  },
});
