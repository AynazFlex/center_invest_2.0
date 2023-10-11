import ScreenWrapper from "./components/ScreenWrapper";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCard } from "../store/dataReducer";
import LoadElem from "./components/LoadElem";
import { Svg, Path } from "react-native-svg";

export default function Card({ navigation, route }) {
  const { account_number } = route.params;
  const { isPending, error_msg, card } = useSelector((state) => state);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getCard(account_number));
    }, [])
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
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
    top_nav: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingVertical: 12,
    },
    top_nav_text: {
        fontSize: 16,
        fontWeight: 400,
        color: '#1B1B1F'
    }
})
