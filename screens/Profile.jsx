import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  FlatList,
} from "react-native";
import BlockWrapper from "./components/BlockWrapper";
import { Circle, G, Path, Polygon, Svg } from "react-native-svg";
import IconWrapper from "./components/IconWrapper";
import ScreenWrapper from "./components/ScreenWrapper";
import useGoHome from "./custom_hooks/useGoHome";
import BottomNav from "./components/BottomNav";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../store/dataReducer";
import { useState } from "react";
import LoadElem from "./components/LoadElem";

const data = [];

const Item = ({ card, navigation }) => {
  return (
    <Pressable>
      <View></View>
      <View></View>
    </Pressable>
  );
};

export default function Profile({ navigation }) {
  useGoHome(navigation);
  const { isPennding, cards, error_msg } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isFirstRender, setRender] = useState(true);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCards());
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (cards) setRender(false);
    }, [cards])
  );

  if (isPennding || isFirstRender) {
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
          <Text style={styles.header__user_cashback}>
            В этом месяце 1 321,3 ₽ кешбека
          </Text>
        </View>
      </View>
      <Text style={styles.accounts}>Счета</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ card }) => <Item navigation={navigation} card={card} />}
        keyExtractor={(item) => item.id}
      />
      <BottomNav navigation={navigation} active_sreen="Profile" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginTop: 16,
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
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
