import { useFocusEffect } from "@react-navigation/native";
import { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/dataReducer";

export default function Gosuslugi({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [log_valid, setLog_valid] = useState(true);
  const [pass_valid, setPass_valid] = useState(true);
  const { error_msg, isPending, isAuth } = useSelector(({ data }) => data);
  const dispatch = useDispatch();

  const log_val = useRef(null);
  const pass_val = useRef(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setLogin("");
        setPassword("");
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      isAuth && navigation.navigate("Welcome");
    }, [isAuth])
  );

  useFocusEffect(
    useCallback(() => {
      error_msg && Alert.alert("Error", error_msg);
    }, [error_msg])
  );

  const handleSubmit = () => {
    if (!login) {
      log_val.current.focus();
      return;
    }
    if (!password) {
      pass_val.current.focus();
      return;
    }
    log_val.current.blur();
    pass_val.current.blur();
    dispatch(
      setAuth({
        username: login,
        password,
      })
    );
  };

  const inputStyles = (flag) =>
    flag
      ? [styles.wrapper, styles.wrapper__all]
      : [styles.wrapper, styles.wrapper__all, styles.wrapper__border];

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={[styles.title__1_step, styles.title__all]}>ГОС</Text>
        <Text style={[styles.title__2_step, styles.title__all]}>УСЛУГИ</Text>
      </View>

      <View style={inputStyles(log_valid)}>
        <Text style={[styles.wrapper__label, styles.font]}>
          Телефон / Email / СНИЛС
        </Text>
        <TextInput
          onBlur={() => login || setLog_valid(false)}
          onFocus={() => log_valid || setLog_valid(true)}
          ref={log_val}
          style={[styles.font]}
          cursorColor={"black"}
          onChangeText={setLogin}
          value={login}
          autoFocus={true}
        />
      </View>
      <View style={inputStyles(pass_valid)}>
        <Text style={[styles.wrapper__label, styles.font]}>Пароль</Text>
        <TextInput
          onBlur={() => password || setPass_valid(false)}
          onFocus={() => pass_valid || setPass_valid(true)}
          ref={pass_val}
          style={[styles.font]}
          secureTextEntry
          cursorColor={"black"}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <Pressable
        onPress={handleSubmit}
        disabled={isPending}
        style={[
          styles.wrapper__all,
          styles.enter,
          { opacity: isPending ? 0.5 : 1 },
        ]}
      >
        {isPending ? (
          <ActivityIndicator size={16} color="white" />
        ) : (
          <Text style={[styles.enter__text, styles.font]}>Войти</Text>
        )}
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    flexDirection: "row",
    marginBottom: 20,
  },

  title__all: {
    fontSize: 24,
    fontWeight: "bold",
  },

  title__1_step: {
    color: "#4e94c9",
  },

  title__2_step: {
    color: "#ee435c",
  },

  wrapper: {
    flexDirection: "column",
    columnGap: 20,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  wrapper__all: {
    borderRadius: 10,
    paddingVertical: 10,
    width: 300,
  },

  wrapper__border: {
    borderColor: "red",
    borderWidth: 1,
  },

  enter: {
    paddingVertical: 20,
    backgroundColor: "#0d4cd3",
  },

  enter__text: {
    textAlign: "center",
    color: "white",
  },

  font: {
    fontSize: 14,
    fontWeight: "500",
  },

  wrapper__label: {
    color: "#b9c7d3",
  },
});
