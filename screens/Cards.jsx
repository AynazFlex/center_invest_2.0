import {
  StatusBar,
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import useGoHome from "./custom_hooks/useGoHome";
import { Svg, Path } from "react-native-svg";
import BlockWrapper from "./components/BlockWrapper";
import IconWrapper from "./components/IconWrapper";
import ScreenWrapper from "./components/ScreenWrapper";

const data = [];

export default function Cards({ navigation }) {
  useGoHome(navigation);

  const handleClick = (id) => alert(id);

  const renderItem = ({ item }) => (
    <Pressable onPress={() => item.can_choose && handleClick(item.card_id)}>
      <View style={styles.card}>
        <View style={styles.card_plastick}>
          <Text style={styles.card_mir}>{item.bank}</Text>
          <Text style={styles.card_numbers}>***{item.last_four_digits}</Text>
        </View>
        <View style={styles.card_cash}>
          <Text style={styles.card_cash_title}>Кешбек</Text>
          {item.cashback.map((elem) => (
            <View style={styles.card_cash_block} key={elem.product_type}>
              <Text>{elem.product_type}:</Text>
              <Text>{elem.value}%</Text>
            </View>
          ))}
          {item.can_choose || (
            <Text style={styles.card_cash_not}>Нельзя менять кешбеки</Text>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenWrapper>
      <BlockWrapper styles={[styles.nav]}>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Svg
            width={50}
            height={50}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <Path
              fill="#3cb93f"
              d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"
            />
          </Svg>
        </Pressable>
        <Pressable>
          <IconWrapper>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 128 128"
            >
              <Path
                fill="red"
                d="M28.628,72.11907A17.97418,17.97418,0,0,1,6.59139,80.13388v38.54969a2.49475,2.49475,0,0,0,2.49111,2.49111H26.35031a2.49477,2.49477,0,0,0,2.49109-2.49111v-46.51A.11355.11355,0,0,0,28.628,72.11907Z"
              />
              <Path
                fill="yellow"
                d="M46.2281,42.16451,37.447,51.07585v67.60772a2.49475,2.49475,0,0,0,2.49111,2.49111H57.20588a2.49477,2.49477,0,0,0,2.49111-2.49111v-72.822L55.99432,42.156A18.13389,18.13389,0,0,1,46.2281,42.16451Z"
              />
              <Path
                fill="blue"
                d="M68.30258,67.084v51.59962a2.49474,2.49474,0,0,0,2.49109,2.49111H88.06148a2.49477,2.49477,0,0,0,2.49111-2.49111V68.02379a17.94923,17.94923,0,0,1-22.25-.93984Z"
              />
              <Path d="M110.14729,35.7358,99.15817,46.72493v71.95864a2.49474,2.49474,0,0,0,2.49109,2.49111h17.26781a2.49477,2.49477,0,0,0,2.49111-2.49111v-83.429a17.95629,17.95629,0,0,1-11.26088.48124Z" />
              <Path
                fill="white"
                d="M115.045,6.82533a11.60217,11.60217,0,0,0-9.725,17.94326l-18.96395,18.964a11.5781,11.5781,0,0,0-12.86295.13029L60.81946,31.18721a11.61122,11.61122,0,1,0-19.45139-.00064L19.28566,53.59035A11.62772,11.62772,0,1,0,22.67974,56.984l22.082-22.40314a11.572,11.572,0,0,0,12.6643,0L70.16978,47.32633a11.61164,11.61164,0,1,0,19.58-.1997l18.9646-18.9646A11.60839,11.60839,0,1,0,115.045,6.82533Z"
              />
            </Svg>
          </IconWrapper>
        </Pressable>
        <Pressable>
          <IconWrapper>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
              viewBox="0 0 448 512"
            >
              <Path
                fill="white"
                d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
              />
            </Svg>
          </IconWrapper>
        </Pressable>
      </BlockWrapper>
      <BlockWrapper>
        <Text style={styles.title}>Мои карты</Text>
      </BlockWrapper>
      <BlockWrapper>
        <FlatList showsVerticalScrollIndicator={false} />
      </BlockWrapper>
      <StatusBar style="auto" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2f136",
    paddingHorizontal: 10,
  },

  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  list: {},
});
