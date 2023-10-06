import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Gosuslugi from "./screens/Gosuslugi";
import Welcome from "./screens/Welcome";
import Cards from "./screens/Cards";
import Profile from "./screens/Profile";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const getFonts = () => Font.loadAsync({
  'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    getFonts().then(() => setFontsLoaded(true)).catch(() => console.warn)
  }, [])

  if (!fontsLoaded) return <View><Text>Loading...</Text></View>

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Gosuslugi"
          component={Gosuslugi}
        />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Cards" component={Cards} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
