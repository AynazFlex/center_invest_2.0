import { useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchLogout } from "../../store/api";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/dataReducer";

export default function useGoHome(navigation) {
  const { access_token, token_type } = useSelector(({ data }) => data);
  const dispatch = useDispatch();

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
            onPress: async () => {
              navigation.removeListener("beforeRemove", goHome);
              await fetchLogout({ access_token, token_type });
              dispatch(setLogout());
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
