import { useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function useGoHome(navigation) {
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
              navigation.popToTop();
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
