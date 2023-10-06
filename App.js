import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Gosuslugi from "./screens/Gosuslugi";
import Welcome from "./screens/Welcome";
import Cards from "./screens/Cards";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
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
          options={{ title: "ГОСУСЛУГИ", headerShown: true }}
        />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Cards" component={Cards} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
