import ScreenWrapper from "./components/ScreenWrapper";
import BottomNav from "./components/BottomNav";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLimits, resetError, setLimits } from "../store/dataReducer";
import LoadElem from "./components/LoadElem";
import ErrorElem from "./components/ErrorElem";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import vw from "../assets/functions/vw";
import font from "../assets/functions/font";
import CashbackIcon from "./components/CashbackIcon";

const LimitArr = [
  {
    category: "автозапчасти",
    value: 10000,
  },
  {
    category: "видеоигры",
    value: 10000,
  },
  {
    category: "напитки",
    value: 500,
  },
  {
    category: "продукты питания",
    value: 1000,
  },
];

const limitArr = [
  { category: "автозапчасти", value: 10000 },
  { category: "аквариум", value: 2000 },
  { category: "напитки", value: 200 },
  { category: "уборка", value: 1200 },
  { category: "одежда", value: 5000 },
  { category: "закуски и приправы", value: 100 },
  { category: "продукты питания", value: 5000 },
  { category: "видеоигры", value: 6000 },
  { category: "образование", value: 3000 },
  { category: "электроника", value: 20000 },
];

const Item = ({ item, setLimitMap }) => {
  return (
    <View style={styles.limit}>
      <CashbackIcon size={vw(24)} name={item.category} />
      <Text style={styles.limit_category}>{item.category}</Text>
      <TextInput
        style={styles.limit_value}
        cursorColor={"black"}
        onChangeText={(text) => {
          setLimitMap((prev) => {
            return prev.map((elem) =>
              elem.category === item.category ? { ...elem, value: text } : elem
            );
          });
        }}
        value={item.value}
      />
    </View>
  );
};

export default function Limits({ navigation }) {
  const { limits, error_msg, isPending } = useSelector(({ data }) => data);
  const dispatch = useDispatch();
  const [limitMap, setLimitMap] = useState(limits);

  useFocusEffect(
    useCallback(() => {
      dispatch(getLimits());
    }, [])
  );

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

  if (!limits || isPending) {
    return <LoadElem />;
  }

  return (
    <ScreenWrapper>
      <FlatList
        style={styles.container}
        data={limitMap}
        renderItem={({ item }) => (
          <Item item={item} setLimitMap={setLimitMap} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i}
      />
      <Pressable
        onPress={() => dispatch(setLimits(limitMap))}
        style={styles.done}
      >
        <Text style={styles.done_text}>Сохранить</Text>
      </Pressable>
      <BottomNav navigation={navigation} active_sreen="Limits" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  done: {
    height: vw(40),
    borderRadius: 10,
    backgroundColor: "#006E0D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: vw(32) + 40,
  },

  done_text: {
    ...font(14, "500", "#FFF"),
  },

  limit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 12,
  },

  limit_category: {
    ...font(20, "500", "#201C00"),
  },

  limit_value: {
    ...font(20, "500", "#201C00"),
    marginLeft: "auto",
    textAlign: "right",
    width: 100,
  },
});
