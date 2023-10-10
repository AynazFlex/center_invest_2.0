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
import LoadElem from "./components/LoadElem";

const CenterInvestIcon = () => (
  <View style={{ padding: 8, backgroundColor: "#FAF9FD" }}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path d="M10.3393 2.5V6.23153L13.3813 2.5H10.3393Z" fill="#50B848" />
      <Path
        d="M15.551 3.01336L10.3393 9.41657V11.0119C10.3448 10.9677 10.3559 10.9235 10.3614 10.8794L10.4276 10.5979C10.5546 10.1839 10.7202 9.82505 10.9852 9.46625L11.1619 9.25649C11.3662 9.04673 11.5649 8.88665 11.8189 8.73761C11.9514 8.66585 12.0784 8.61065 12.2164 8.56097C12.5256 8.47265 12.785 8.43401 13.1108 8.44505L13.4089 8.48921C13.6573 8.54993 13.8671 8.62169 14.0879 8.74313C14.2149 8.81489 14.3253 8.89217 14.4413 8.97497C14.7836 9.26201 15.0154 9.56561 15.2252 9.94097L15.3412 10.1949C15.435 10.4378 15.5013 10.7911 15.551 11.0284V3.01336Z"
        fill="#50B848"
      />
      <Path
        d="M12.9562 9.02465C11.8189 9.02465 10.8914 10.1949 10.8914 11.6246C10.8914 13.0543 11.8189 14.2245 12.9562 14.2245C14.0935 14.2245 15.0265 13.0543 15.0265 11.6246C15.0265 10.1949 14.099 9.02465 12.9562 9.02465ZM12.9562 13.3799C12.2716 13.3799 11.714 12.5906 11.714 11.6246C11.714 10.6586 12.2716 9.86369 12.9562 9.86369C13.6408 9.86369 14.2039 10.6531 14.2039 11.6246C14.2039 12.5961 13.6408 13.3799 12.9562 13.3799Z"
        fill="#50B848"
      />
      <Path
        d="M10.4332 12.6513L10.3669 12.3698C10.3559 12.3256 10.3503 12.2815 10.3448 12.2373V15.3561H15.5565V12.2539C15.4902 12.5851 15.3909 12.9935 15.2308 13.3137L15.0927 13.5566C14.883 13.8767 14.6566 14.1251 14.3419 14.3625L14.099 14.5115C13.8726 14.6275 13.6684 14.7047 13.4199 14.7655C13.2653 14.7931 13.1218 14.8041 12.9672 14.8096C12.7574 14.8041 12.5752 14.782 12.371 14.7323C12.2274 14.6882 12.0949 14.6385 11.9624 14.5833C11.6533 14.4232 11.4159 14.2411 11.1785 13.9982L10.9963 13.7829C10.7368 13.4241 10.5657 13.0708 10.4387 12.6513H10.4332Z"
        fill="#50B848"
      />
      <Path
        d="M3.33337 14.8427L8.54504 8.43953V6.84425C8.54504 6.88841 8.52847 6.93257 8.52295 6.97673L8.4567 7.25825C8.33524 7.67225 8.1641 8.03105 7.8991 8.38985L7.72243 8.59961C7.51816 8.80937 7.32493 8.96393 7.06545 9.11849C6.93295 9.19025 6.80598 9.24545 6.66796 9.29513C6.35879 9.38345 6.09931 9.42209 5.77358 9.41105L5.47546 9.37241C5.2215 9.31169 5.01723 9.23441 4.79639 9.11849C4.66941 9.04673 4.559 8.96945 4.44306 8.88665C4.10629 8.59961 3.86889 8.29601 3.66462 7.92065L3.54317 7.66673C3.44931 7.42937 3.38306 7.07609 3.33337 6.83873V14.8483V14.8427Z"
        fill="#50B848"
      />
      <Path
        d="M5.92816 8.83145C7.06546 8.83145 7.99848 7.66673 7.99848 6.23153C7.99848 4.79632 7.07098 3.6316 5.92816 3.6316C4.78535 3.6316 3.85785 4.79632 3.85785 6.23153C3.85785 7.66121 4.78535 8.83145 5.92816 8.83145ZM5.92816 4.47064C6.61827 4.47064 7.17587 5.26 7.17587 6.23153C7.17587 7.20305 6.61827 7.98689 5.92816 7.98689C5.23806 7.98689 4.68046 7.19753 4.68046 6.23153C4.68046 5.26553 5.23806 4.47064 5.92816 4.47064Z"
        fill="#50B848"
      />
      <Path
        d="M8.4567 5.20481L8.52295 5.48633C8.52847 5.53049 8.53952 5.57465 8.54504 5.61881V2.5H3.33337V5.60777C3.39962 5.27657 3.50452 4.86808 3.6591 4.54792L3.79712 4.30504C4.00692 3.98488 4.23327 3.73648 4.54796 3.49912L4.78535 3.34456C5.01171 3.22864 5.21598 3.15136 5.46441 3.09616C5.619 3.06856 5.76254 3.05752 5.91712 3.052C6.12691 3.05752 6.3091 3.0796 6.51337 3.12928C6.65691 3.17344 6.78941 3.22312 6.92191 3.27832C7.23108 3.44392 7.46847 3.62056 7.70587 3.86344L7.88806 4.0732C8.14754 4.432 8.31868 4.7908 8.44566 5.20481H8.4567Z"
        fill="#50B848"
      />
      <Path
        d="M8.54504 11.6246L5.50306 15.3561H8.54504V11.6246Z"
        fill="#50B848"
      />
      <Path
        d="M14.0769 2.5L3.63702 15.3561H4.79087L15.2528 2.5H14.0769Z"
        fill="#50B848"
      />
      <Path
        d="M9.87004 14.4729H8.9867V15.3561H9.87004V14.4729Z"
        fill="#50B848"
      />
      <Path
        d="M16.0699 14.4729V15.3561C16.6827 15.3561 17.1078 15.9357 17.1078 16.5374C17.1078 17.1391 16.611 17.7187 15.9982 17.7187C15.5454 17.7187 15.1369 17.6193 14.2867 17.4095C12.6304 17.0066 10.5988 16.5043 8.96462 16.1068C6.03306 15.3837 3.34442 16.2007 3.33337 18.1051H4.22775C4.22775 17.3985 5.59691 16.9293 8.53399 17.6469C11.0736 18.2707 12.0287 18.5025 13.9444 18.9717C15.2087 19.2808 16.2411 19.2091 16.9864 18.8503C17.7317 18.4915 18.2396 17.6193 18.2396 16.7471C18.2396 15.5217 17.3066 14.4729 16.0644 14.4729H16.0699Z"
        fill="#50B848"
      />
    </Svg>
  </View>
);

const CashbackIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <Path
      d="M4.00004 4.00001L7.00004 7.00001M4.00004 4.00001H2.00004L1.33337 2.00001L2.00004 1.33334L4.00004 2.00001V4.00001ZM12.8394 1.82735L11.0876 3.5791C10.8236 3.84311 10.6916 3.97511 10.6421 4.12733C10.5986 4.26123 10.5986 4.40546 10.6421 4.53935C10.6916 4.69157 10.8236 4.82358 11.0876 5.08759L11.2458 5.24576C11.5098 5.50977 11.6418 5.64178 11.794 5.69124C11.9279 5.73474 12.0722 5.73474 12.2061 5.69124C12.3583 5.64178 12.4903 5.50977 12.7543 5.24576L14.3929 3.60715C14.5694 4.0366 14.6667 4.50694 14.6667 5.00001C14.6667 7.02505 13.0251 8.66668 11 8.66668C10.7559 8.66668 10.5173 8.64282 10.2865 8.5973C9.96245 8.53338 9.8004 8.50142 9.70216 8.51121C9.59772 8.52162 9.54625 8.53728 9.45371 8.5868C9.36667 8.63338 9.27935 8.72069 9.10473 8.89532L4.33337 13.6667C3.78109 14.219 2.88566 14.219 2.33337 13.6667C1.78109 13.1144 1.78109 12.219 2.33338 11.6667L7.10473 6.89532C7.27936 6.72069 7.36667 6.63338 7.41325 6.54633C7.46277 6.4538 7.47843 6.40232 7.48884 6.29788C7.49863 6.19965 7.46667 6.0376 7.40275 5.7135C7.35723 5.48271 7.33337 5.24415 7.33337 5.00001C7.33337 2.97497 8.975 1.33334 11 1.33334C11.6704 1.33334 12.2987 1.51323 12.8394 1.82735ZM8.00007 9.99997L11.6667 13.6666C12.219 14.2189 13.1144 14.2189 13.6667 13.6666C14.219 13.1143 14.219 12.2189 13.6667 11.6666L10.6502 8.65021C10.4367 8.63 10.2285 8.59148 10.0272 8.53623C9.76786 8.46504 9.48334 8.51671 9.29315 8.7069L8.00007 9.99997Z"
      stroke="#6B61FD"
      stroke-width="1.33"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

const Item = ({ item, navigation }) => (
  <View style={styles.card__wrapper}>
    <View style={styles.card__header}>
      <CenterInvestIcon />
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
          <View style={styles.card__cashback_item}>
            <CashbackIcon />
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
        onPress={() => alert(item.account_number)}
      >
        <Text style={styles.card__button_text}>
          {item.cashbacks.length ? "Поменять" : "Выбрать"} категории
        </Text>
      </Pressable>
    )}
  </View>
);

export default function Profile({ navigation }) {
  useGoHome(navigation);
  const { cards, error_msg } = useSelector((state) => state);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getCards());
    }, [])
  );

  if (!cards) {
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
    fontWeight: 500,
  },

  card__no: {
    fontSize: 12,
    fontWeight: 400,
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
    fontWeight: 400,
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
    fontWeight: 500,
    color: "#1B1B1F",
  },
});
