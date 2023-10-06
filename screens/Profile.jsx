import { View, StyleSheet, Pressable, Text } from "react-native";
import BlockWrapper from "./components/BlockWrapper";
import { Circle, G, Path, Polygon, Svg } from "react-native-svg";
import IconWrapper from "./components/IconWrapper";
import ScreenWrapper from "./components/ScreenWrapper";

export default function Profile({ navigation }) {
  return (
    <ScreenWrapper>
      <BlockWrapper styles={[styles.nav]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 487.62 487.62"
            width={50}
            height={50}
          >
            <G>
              <G>
                <Circle fill="#3cb93f" cx="243.81" cy="243.81" r="243.81" />
                <Polygon
                  fill="#FFFFFF"
                  points="98.053,244.956 222.413,368.263 254.59,335.58 184.584,267.215 389.746,265.618 
			389.389,219.754 184.206,221.352 253.16,151.884 220.477,119.706"
                />
              </G>
            </G>
          </Svg>
        </Pressable>
        <IconWrapper>
          <Pressable onPress={() => navigation.popToTop()}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={40}
              height={40}
            >
              <Path
                fill="white"
                d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"
              />
            </Svg>
          </Pressable>
        </IconWrapper>
      </BlockWrapper>
      <BlockWrapper></BlockWrapper>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
