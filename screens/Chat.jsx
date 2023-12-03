import ScreenWrapper from "./components/ScreenWrapper";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import BankIcon from "./components/BankIcon";
import BottomNav from "./components/BottomNav";
import { useSelector, useDispatch } from "react-redux";
import vw from "../assets/functions/vw";
import font from "../assets/functions/font";
import ErrorElem from "./components/ErrorElem";
import { getChat } from "../store/dataReducer";

const Item = ({ item }) => {
  return (
    <View style={styles.chat}>
      <View style={styles.chat__body}>
        <Text style={styles.chat__body_body}>{item.answer}</Text>
      </View>
      <View style={styles.chat__icon}>
        <BankIcon color={"#EFEDF1"} isCenter />
      </View>
    </View>
  );
};

const Items = ({ chat, isPending }) => {
  if (isPending)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={vw(16)} color="#95F7B9" />
      </View>
    );

  return (
    <FlatList
      style={styles.container}
      data={chat}
      renderItem={Item}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, i) => i}
    />
  );
};

export default function Chat({ navigation }) {
  const { chat, error_msg, isPending, transactions } = useSelector(
    ({ data }) => data
  );
  const dispatch = useDispatch();

  if (!transactions) {
    return (
      <ErrorElem
        callback={() => {
          navigation.navigate("Statistics");
        }}
        error_msg={"Загрузите транзакции"}
      />
    );
  }

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

  return (
    <ScreenWrapper>
      <Items chat={chat} isPending={isPending} />
      <View style={styles.questions}>
        <Pressable
          disabled={isPending}
          onPress={() => dispatch(getChat(1))}
          style={styles.question}
        >
          <Text style={styles.question_text}>
            Получить советы по финансам на текущий месяц
          </Text>
        </Pressable>
        <Pressable
          disabled={isPending}
          onPress={() => dispatch(getChat(2))}
          style={styles.question}
        >
          <Text style={styles.question_text}>
            Получить аналитику трат за прошлый месяц
          </Text>
        </Pressable>
      </View>
      <BottomNav navigation={navigation} active_sreen="Chat" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  chat: {
    marginTop: 16,
  },

  chat__body: {
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#EFEDF1",
    marginRight: vw(44),
  },

  chat__body_title: {
    ...font(12, "500", "#44474F"),
    marginBottom: 8,
  },

  chat__body_body: {
    ...font(12, "400", "#44474F"),
    marginBottom: 8,
  },

  chat__body_time: {
    ...font(12, "400", "#44474F"),
    textAlign: "right",
  },

  chat__icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },

  questions: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#EFEDF1",
    marginBottom: vw(32) + 40,
  },

  question: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FAF9FD",
    borderRadius: 16,
  },

  question_text: {
    ...font(16, "400", "#1B1B1F"),
  },

  loading: {
    justifyContent: "center",
    marginTop: 100,
    marginBottom: "auto",
  },
});
