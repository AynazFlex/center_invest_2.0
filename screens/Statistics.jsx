import BottomNav from "./components/BottomNav";
import ScreenWrapper from "./components/ScreenWrapper";
import { Text } from "react-native";

export default function Statistics({ navigation }) {
  return (
    <ScreenWrapper>
      <Text>Статистика</Text>
      <BottomNav navigation={navigation} active_sreen="Statistics" />
    </ScreenWrapper>
  );
}
