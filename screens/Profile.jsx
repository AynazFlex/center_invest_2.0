import { View, StyleSheet, Pressable, Text, Image, FlatList } from "react-native";
import BlockWrapper from "./components/BlockWrapper";
import { Circle, G, Path, Polygon, Svg } from "react-native-svg";
import IconWrapper from "./components/IconWrapper";
import ScreenWrapper from "./components/ScreenWrapper";
import useGoHome from "./custom_hooks/useGoHome";

const data = [

]

const Item = ({card, navigation}) => {
  return (
    <Pressable>
      <View></View>
      <View></View>
    </Pressable>
  )
}

export default function Profile({ navigation }) {
  useGoHome(navigation);

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Image width={48} height={48} style={styles.header__img} source={require('../assets/image/user_icon.png')}/>
        <View style={styles.header__info}>
          <Text style={styles.header__user_name}>Александр</Text>
          <Text style={styles.header__user_cashback}>В этом месяце 1 321,3 ₽ кешбека</Text>
        </View>
      </View>
      <Text style={styles.accounts}>Счета</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({card}) => <Item navigation={navigation} card={card} />}
        keyExtractor={item => item.id}
      />
      <View>
        <Pressable></Pressable>
        <Pressable></Pressable>
        <Pressable></Pressable>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 16
  },

  header__info: {
    
  },

  header__user_name: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#1B1B1F'
  },

  header__user_cashback: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#44474F'
  },

  accounts: {
    marginTop: 32,
    fontSize: 22,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#1B1B1F'
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
