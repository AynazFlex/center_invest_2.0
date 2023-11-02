import { View, Pressable, StyleSheet, Text } from "react-native";
import { Path, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import vw from "../../assets/functions/vw";
import font from "../../assets/functions/font";

const BottomNav = ({ navigation, active_sreen }) => {
  const activeLink = (val) => (active_sreen === val ? "#95F7B9" : "#EFEDF1");
  const { notifications } = useSelector(({ data }) => data);

  const handlePress = (str) => navigation.navigate(str);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.panel, { left: -16 }]} />
      <Pressable
        onPress={() => handlePress("Profile")}
        style={[styles.link, { backgroundColor: activeLink("Profile") }]}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={vw(25)}
          height={vw(24)}
          viewBox="0 0 25 24"
          fill="none"
        >
          <Path
            d="M13.6489 2.76401C13.2976 2.49076 13.1219 2.35413 12.928 2.30162C12.7568 2.25528 12.5764 2.25528 12.4053 2.30162C12.2113 2.35413 12.0356 2.49076 11.6843 2.76401L4.90202 8.03914C4.44865 8.39176 4.22196 8.56807 4.05865 8.78887C3.91399 8.98446 3.80623 9.2048 3.74065 9.43907C3.66663 9.70353 3.66663 9.99071 3.66663 10.5651V17.8C3.66663 18.9201 3.66663 19.4802 3.88461 19.908C4.07636 20.2843 4.38232 20.5903 4.75864 20.782C5.18647 21 5.74652 21 6.86663 21H8.86663C9.14665 21 9.28667 21 9.39362 20.9455C9.4877 20.8976 9.56419 20.8211 9.61213 20.727C9.66663 20.62 9.66663 20.48 9.66663 20.2V13.6C9.66663 13.0399 9.66663 12.7599 9.77562 12.546C9.87149 12.3578 10.0245 12.2049 10.2126 12.109C10.4265 12 10.7066 12 11.2666 12H14.0666C14.6267 12 14.9067 12 15.1206 12.109C15.3088 12.2049 15.4618 12.3578 15.5576 12.546C15.6666 12.7599 15.6666 13.0399 15.6666 13.6V20.2C15.6666 20.48 15.6666 20.62 15.7211 20.727C15.7691 20.8211 15.8455 20.8976 15.9396 20.9455C16.0466 21 16.1866 21 16.4666 21H18.4666C19.5867 21 20.1468 21 20.5746 20.782C20.9509 20.5903 21.2569 20.2843 21.4486 19.908C21.6666 19.4802 21.6666 18.9201 21.6666 17.8V10.5651C21.6666 9.99071 21.6666 9.70353 21.5926 9.43907C21.527 9.2048 21.4193 8.98446 21.2746 8.78887C21.1113 8.56807 20.8846 8.39176 20.4312 8.03914L13.6489 2.76401Z"
            stroke="#002110"
            fill={active_sreen === "Profile" ? "#002110" : "none"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Pressable>
      <Pressable
        onPress={() => handlePress("Statistics")}
        style={[styles.link, { backgroundColor: activeLink("Statistics") }]}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={vw(24)}
          height={vw(24)}
          viewBox="0 0 24 24"
          fill="none"
        >
          {active_sreen === "Statistics" && (
            <Path
              d="M21.9684 11.2009C21.8851 10.1614 21.6395 9.13964 21.2392 8.17317C20.7367 6.95992 20.0001 5.85753 19.0715 4.92894C18.1429 4.00036 17.0405 3.26376 15.8272 2.76121C14.8608 2.36089 13.839 2.11533 12.7996 2.03199C12.5428 2.0114 12.4144 2.00111 12.2987 2.0521C12.2021 2.0947 12.1107 2.17909 12.0605 2.27199C12.0004 2.38321 12.0004 2.52214 12.0004 2.80001V11.2C12.0004 11.48 12.0004 11.62 12.0549 11.727C12.1028 11.8211 12.1793 11.8976 12.2734 11.9455C12.3804 12 12.5204 12 12.8004 12H21.2004C21.4783 12 21.6172 12 21.7284 11.9399C21.8213 11.8898 21.9057 11.7983 21.9483 11.7017C21.9993 11.5861 21.989 11.4577 21.9684 11.2009Z"
              fill="#002110"
            />
          )}
          <Path
            d="M21.2104 15.89C20.5742 17.3945 19.5792 18.7202 18.3123 19.7513C17.0454 20.7824 15.5452 21.4874 13.9428 21.8048C12.3405 22.1221 10.6848 22.0422 9.12055 21.5718C7.55627 21.1015 6.13103 20.2551 4.96942 19.1067C3.80782 17.9582 2.94522 16.5428 2.45704 14.984C1.96886 13.4252 1.86996 11.7705 2.169 10.1646C2.46804 8.55879 3.1559 7.05064 4.17245 5.77204C5.189 4.49344 6.50329 3.48333 8.0004 2.83001M21.2392 8.17317C21.6395 9.13964 21.8851 10.1614 21.9684 11.2009C21.989 11.4577 21.9993 11.5861 21.9483 11.7017C21.9057 11.7983 21.8213 11.8898 21.7284 11.9399C21.6172 12 21.4783 12 21.2004 12H12.8004C12.5204 12 12.3804 12 12.2734 11.9455C12.1793 11.8976 12.1028 11.8211 12.0549 11.727C12.0004 11.62 12.0004 11.48 12.0004 11.2V2.80001C12.0004 2.52214 12.0004 2.38321 12.0605 2.27199C12.1107 2.17909 12.2021 2.0947 12.2987 2.0521C12.4144 2.00111 12.5428 2.0114 12.7996 2.03199C13.839 2.11533 14.8608 2.36089 15.8272 2.76121C17.0405 3.26376 18.1429 4.00035 19.0715 4.92894C20.0001 5.85753 20.7367 6.95992 21.2392 8.17317Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Pressable>
      <Pressable
        onPress={() => handlePress("Notifications")}
        style={[styles.link, { backgroundColor: activeLink("Notifications") }]}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={vw(25)}
          height={vw(24)}
          viewBox="0 0 25 24"
          fill="none"
        >
          <Path
            d="M9.68745 21C10.3926 21.6224 11.3188 22 12.3333 22C13.3477 22 14.274 21.6224 14.9791 21M18.3333 8C18.3333 6.4087 17.7011 4.88258 16.5759 3.75736C15.4507 2.63214 13.9246 2 12.3333 2C10.742 2 9.21585 2.63214 8.09063 3.75736C6.96541 4.88258 6.33327 6.4087 6.33327 8C6.33327 11.0902 5.55374 13.206 4.68294 14.6054C3.9484 15.7859 3.58113 16.3761 3.5946 16.5408C3.60951 16.7231 3.64813 16.7926 3.79505 16.9016C3.92773 17 4.52586 17 5.72212 17H18.9444C20.1407 17 20.7388 17 20.8715 16.9016C21.0184 16.7926 21.057 16.7231 21.0719 16.5408C21.0854 16.3761 20.7181 15.7859 19.9836 14.6054C19.1128 13.206 18.3333 11.0902 18.3333 8Z"
            stroke="#44474F"
            fill={active_sreen === "Notifications" ? "#002110" : "none"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <View style={styles.notif_num}>
          <Text style={styles.notif_num_text}>{notifications.length}</Text>
        </View>
      </Pressable>
      <View style={[styles.panel, { right: -16 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 16,
    width: "100%",
    paddingHorizontal: 31,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#EFEDF1",
  },
  panel: {
    width: 16,
    height: vw(32) + 32,
    position: "absolute",
    top: 0,
    backgroundColor: "#EFEDF1",
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: vw(64),
    height: vw(32),
    borderRadius: vw(16),
  },
  notif_num: {
    position: "absolute",
    left: "50%",
    top: 2,
    justifyContent: "center",
    alignItems: "center",
    width: vw(16),
    height: vw(16),
    backgroundColor: "#BA1A1A",
    borderRadius: vw(8),
  },
  notif_num_text: {
    ...font(11, "500", "#FFF"),
  },
});

export default BottomNav;
