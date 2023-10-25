import { useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function useGoHome(navigation, func) {
  useFocusEffect(
    useCallback(() => {
      const goHome = (e) => {
        e.preventDefault();
        Alert.alert("", "Выйти из профиля?", [
          {
            text: "Нет",
            style: "cancel",
          },
          {
            text: "Да",
            style: "destructive",
            onPress: () => {
              navigation.removeListener("beforeRemove", goHome);
              func();
            },
          },
        ]);
      };

      navigation.addListener("beforeRemove", goHome);

      return () => {
        navigation.removeListener("beforeRemove", goHome);
      };
    }, [navigation])
  );
}
