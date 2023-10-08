import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Gosuslugi from "./screens/Gosuslugi";
import Welcome from "./screens/Welcome";
import Profile from "./screens/Profile";
import Statistics from "./screens/Statistics";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store/store";

const getFonts = () =>
  Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
  });

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    getFonts()
      .then(() => setFontsLoaded(true))
      .catch(() => console.warn);
  }, []);

  if (!fontsLoaded)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Gosuslugi" component={Gosuslugi} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Statistics" component={Statistics} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
