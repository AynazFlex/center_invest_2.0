import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Gosuslugi from "./screens/Gosuslugi";
import Welcome from "./screens/Welcome";
import Profile from "./screens/Profile";
import Statistics from "./screens/Statistics";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Notifications from './screens/Notifications'
import LoadElem from "./screens/components/LoadElem";
import Card from "./screens/Card";
import Transaction from "./screens/Transaction";

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

  if (!fontsLoaded) return <LoadElem />;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Gosuslugi" component={Gosuslugi} />
          <Stack.Screen options={{animation: 'none'}} name="Welcome" component={Welcome} />
          <Stack.Screen options={{animation: 'none'}} name="Profile" component={Profile} />
          <Stack.Screen options={{animation: 'none'}} name="Statistics" component={Statistics} />
          <Stack.Screen options={{animation: 'none'}} name="Notifications" component={Notifications} />
          <Stack.Screen options={{animation: 'none'}} name="Card" component={Card} />
          <Stack.Screen options={{animation: 'none'}} name="Transaction" component={Transaction} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
