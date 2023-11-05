import BottomNav from "./components/BottomNav";
import ScreenWrapper from "./components/ScreenWrapper";
import { Text, StyleSheet, View, FlatList } from "react-native";
import BankIcon from "./components/BankIcon";
import { useSelector } from "react-redux";
import vw from "../assets/functions/vw";
import font from "../assets/functions/font";

const Item = ({ item }) => {
  return (
    <View style={styles.mess}>
      <View style={styles.mess__body}>
        <Text style={styles.mess__body_title}>{item.title}</Text>
        <Text style={styles.mess__body_body}>{item.body}</Text>
        <Text style={styles.mess__body_time}>{item.time}</Text>
      </View>
      <View style={styles.mess__icon}>
        <BankIcon color={"#EFEDF1"} isCenter={item.title === "Центр-инвест"} />
      </View>
    </View>
  );
};

export default function Notifications({ navigation }) {
  const { notifications } = useSelector(({ data }) => data);

  return (
    <ScreenWrapper>
      <FlatList
        style={styles.container}
        data={notifications}
        renderItem={Item}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i}
      />
      <BottomNav navigation={navigation} active_sreen="Notifications" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: vw(32) + 32,
  },
  mess: {
    marginTop: 16,
  },

  mess__body: {
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#EFEDF1",
    marginRight: vw(44),
  },

  mess__body_title: {
    ...font(12, "500", "#44474F"),
    marginBottom: 8,
  },

  mess__body_body: {
    ...font(12, "400", "#44474F"),
    marginBottom: 8,
  },

  mess__body_time: {
    ...font(12, "400", "#44474F"),
    textAlign: "right",
  },

  mess__icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
