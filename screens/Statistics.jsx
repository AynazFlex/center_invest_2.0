import { useFocusEffect } from "@react-navigation/native";
import BottomNav from "./components/BottomNav";
import ScreenWrapper from "./components/ScreenWrapper";
import { FlatList, Text, View } from "react-native";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTransactions } from "../store/dataReducer";
import LoadElem from "./components/LoadElem";

const sortByDate = (transactions) => {
  const map = new Map();

  const converDate = (time) => {
    const date = new Date(time);

    return `${date.getDate()}:${date.getMonth()}:${date.getFullYear()}`;
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

  return [...map]
};

const Item = ({item}) => {
  console.log(item)
  return (
    <Text>{item[0]}</Text>
  )
}

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
      <Text>Статистика</Text>
      <BottomNav navigation={navigation} active_sreen="Statistics" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item[0]}
      />
    </ScreenWrapper>
  );
}
