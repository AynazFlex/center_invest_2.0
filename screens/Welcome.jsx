import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import useGoHome from "./custom_hooks/useGoHome";
import ScreenWrapper from "./components/ScreenWrapper";
import IconWrapper from "./components/IconWrapper";
import { G, Svg, Polygon, Path } from "react-native-svg";

export default function Welcome({ navigation }) {
  useGoHome(navigation);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Profile");
    }, 1000);
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <IconWrapper>
          <Svg
            width="34px"
            height="23px"
            viewBox="0 0 24 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <G transform="translate(-814.000000, -248.000000)">
                <G transform="translate(100.000000, 100.000000)">
                  <G transform="translate(714.000000, 142.000000)">
                    <G transform="translate(0.000000, 0.000000)">
                      <Polygon points="0 0 24 0 24 24 0 24"></Polygon>
                      <Path
                        d="M17.3,6.3 C16.91,5.91 16.28,5.91 15.89,6.3 L10.25,11.94 L11.66,13.35 L17.3,7.7 C17.68,7.32 17.68,6.68 17.3,6.3 Z M21.54,6.29 L11.66,16.17 L8.18,12.7 C7.79,12.31 7.16,12.31 6.77,12.7 C6.38,13.09 6.38,13.72 6.77,14.11 L10.95,18.29 C11.34,18.68 11.97,18.68 12.36,18.29 L22.95,7.71 C23.34,7.32 23.34,6.69 22.95,6.3 L22.94,6.3 C22.56,5.9 21.93,5.9 21.54,6.29 Z M1.12,14.12 L5.3,18.3 C5.69,18.69 6.32,18.69 6.71,18.3 L7.41,17.6 L2.53,12.7 C2.14,12.31 1.51,12.31 1.12,12.7 C0.73,13.09 0.73,13.73 1.12,14.12 Z"
                        fill="white"
                      ></Path>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </Svg>
        </IconWrapper>
        <Text style={styles.text}>Добро пожаловать!</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  text: {
    fontSize: 24,
    fontWeight: "400",
    color: "#1B1B1F",
  },
});
