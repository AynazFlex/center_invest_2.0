import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Gosuslugi from "./screens/Gosuslugi";
import Welcome from "./screens/Welcome";
import Profile from "./screens/Profile";
import Statistics from "./screens/Statistics";
import { Provider } from "react-redux";
import store from "./store/store";
import Notifications from "./screens/Notifications";
import Card from "./screens/Card";
import Transaction from "./screens/Transaction";
import * as Font from "expo-font";
import { useEffect } from "react";
import { useState } from "react";
import LoadElem from "./screens/components/LoadElem";
import Chat from "./screens/Chat";
import Limits from "./screens/Limits";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoad, setLoad] = useState(true);
  useEffect(() => {
    const fontsLoadAsync = async () => {
      await Font.loadAsync({
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
      });
    };

    fontsLoadAsync().finally(() => setLoad(false));
  }, []);

  if (isLoad) return <LoadElem />;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Gosuslugi" component={Gosuslugi} />
          <Stack.Screen
            options={{ animation: "none" }}
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            options={{ animation: "none" }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            options={{ animation: "none" }}
            name="Statistics"
            component={Statistics}
          />
          <Stack.Screen
            options={{ animation: "none" }}
            name="Notifications"
            component={Notifications}
          />
          <Stack.Screen
            options={{ animation: "none" }}
            name="Card"
            component={Card}
          />
          <Stack.Screen
            options={{ animation: "none" }}
            name="Transaction"
            component={Transaction}
          />
          <Stack.Screen
            options={{ animation: "none" }}
            name="Chat"
            component={Chat}
          />
          <Stack.Screen
            options={{ animation: "none" }}
            name="Limits"
            component={Limits}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
