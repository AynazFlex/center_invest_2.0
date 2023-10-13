import { useFocusEffect } from "@react-navigation/native";
import BottomNav from "./components/BottomNav";
import ScreenWrapper from "./components/ScreenWrapper";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTransactions } from "../store/dataReducer";
import LoadElem from "./components/LoadElem";
import CashbackIcon from "./components/CashbackIcon";

const convertMonth = {
  0: "января",
  1: "февраля",
  2: "марта",
  3: "апреля",
  4: "мая",
  5: "июня",
  6: "июля",
  7: "августа",
  8: "сентября",
  9: "октября",
  10: "ноября",
  11: "декабря",
};

const sortByDate = (transactions) => {
  const map = new Map();

  const converDate = (time) => {
    const date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  transactions.forEach((item) => {
    item.transactions.forEach((transaction) => {
      const date = converDate(transaction.time);
      const object = {
        account_number: item.account_number,
        bank: item.bank,
        transaction: {
          time: transaction.time,
          name: transaction.name,
          value: transaction.value,
          category: transaction.category,
        },
      };

      if (map.has(date)) {
        map.set(date, [...map.get(date), object]);
      } else {
        map.set(date, [object]);
      }
    });
  });

  return [...map].sort((a, b) => new Date(a[0]) - new Date(b[0]));
};

const Item = ({ item }) => {
  console.log(item);
  const date = new Date(item[0]);
  const converDate = `${date.getDate()} ${
    convertMonth[date.getMonth()]
  } ${date.getFullYear()}`;

  return (
    <View style={styles.shopping__item}>
      <Text style={styles.shopping__item_text}>{converDate}</Text>
      {item[1].map((i) => (
        <View style={styles.shopping__item_wrapper} key={i.transaction.time}>
          <View style={styles.shopping__item_icon}>
            <CashbackIcon size={16} name={i.transaction.category} />
          </View>
          <View>
            <Text style={styles.shopping__item_top}>
              {i.transaction.name.length > 10
                ? i.transaction.name.slice(0, 10) + "..."
                : i.transaction.name}
            </Text>
            <Text style={styles.shopping__item_bottom}>
              {i.transaction.category}
            </Text>
          </View>
          <View style={styles.shopping__item_right}>
            <Text style={styles.shopping__item_top}>
              -{i.transaction.value} ₽
            </Text>
            <Text style={styles.shopping__item_bottom}>{i.bank}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default function Statistics({ navigation }) {
  const { isPending, error_msg, transactions } = useSelector((state) => state);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getTransactions());
    }, [])
  );

  if (!transactions || isPending) {
    return <LoadElem />;
  }

  const data = sortByDate(transactions);

  return (
    <ScreenWrapper>
      <FlatList
        style={styles.shopping}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item[0]}
      />
      <BottomNav navigation={navigation} active_sreen="Statistics" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  shopping: {
    marginTop: 16,
    marginBottom: 66,
  },

  shopping__item: {
    marginBottom: 12,
    flexDirection: "column",
    gap: 8,
  },

  shopping__item_text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#44474F",
  },

  shopping__item_wrapper: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  shopping__item_icon: {
    borderRadius: "50%",
    padding: 8,
    backgroundColor: "#EFEDF1",
  },

  shopping__item_right: {
    marginLeft: "auto",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  shopping__item_top: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1B1B1F",
  },

  shopping__item_bottom: {
    fontWeight: 12,
    fontSize: "400",
    color: "#44474F",
  },
});
