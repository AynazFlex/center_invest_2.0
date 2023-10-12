import ScreenWrapper from "./components/ScreenWrapper";
import { Pressable, Text, View, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCard } from "../store/dataReducer";
import LoadElem from "./components/LoadElem";
import { Svg, Path } from "react-native-svg";
import CashbackIcon from "./components/CashbackIcon";

const Item = ({ product_type, isChoose }) => {
  return (
    <Pressable
      style={styles.cashbacks_item}
      onPress={() => alert(product_type)}
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
  const { isPending, error_msg, card } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [cash, setCash] = useState([]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCard(account_number));

      return () => setCash([])
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      card && setCash(card.cashbacks.slice(0, 3).map(({product_type}) => product_type));
    }, [card])
  );

  if (!card || isPending) return <LoadElem />;

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
            product_type={product_type}
            isChoose={cash.includes(product_type)}
          />
        )}
        keyExtractor={({ product_type }) => {
          console.log(product_type);
          return product_type;
        }}
      />
      <Pressable style={styles.done} onPress={() => alert('got')}>
        <Text style={styles.done_text}>Готово</Text>
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
    fontWeight: '400',
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
    fontWeight: '500',
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
    backgroundColor: '#006E0D',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 16
  },
  done_text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF'
  }
});
