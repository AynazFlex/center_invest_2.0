import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import ScreenWrapper from "./components/ScreenWrapper";

export default function Home({ navigation }) {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.center_invest_label}>
          <Image
            style={styles.center_invest_img}
            source={require("../assets/center-invest.png")}
          />
          <Text style={styles.center_invest_title}>Центр Инвест</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gosuslugi")}
        >
          <Text style={styles.button__text}>Войти через Госуслуги</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontSize: 30,
    backgroundColor: "#3cb93f",
    borderRadius: 10,
  },

  button__text: {
    color: "white",
    fontSize: 24,
  },

  center_invest_label: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    left: 0,
    top: 10,
  },

  center_invest_img: {
    width: 70,
    height: 70,
  },

  center_invest_title: {
    fontSize: 32,
    color: "#3cb93f",
    fontWeight: "bold",
  },
});
