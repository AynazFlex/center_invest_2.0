import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import ScreenWrapper from "./components/ScreenWrapper";
import {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  Svg,
  LinearGradient,
  Stop,
} from "react-native-svg";

export default function Home({ navigation }) {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.center_invest_label}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="152"
            height="32"
            viewBox="0 0 152 32"
            fill="none"
          >
            <G clip-path="url(#clip0_54499_35618)">
              <Path
                d="M88.7983 18.5703H83.7688V20.9281H88.7983V18.5703Z"
                fill="#50B848"
              />
              <Path
                d="M65.8137 14.7028H68.5107V24.6939H71.1739V14.7028H73.8795V12.3619H65.8137V14.7028ZM62.1073 17.0012H57.3492V12.3534H54.686V24.6854H57.3492V19.3421H62.1073V24.6854H64.7704V12.3619H62.1073V17.0097V17.0012ZM43.4057 12.3534H40.7426V22.353H36.3153V12.3619H33.6521V24.6939H42.371V27.3995H44.856V22.353H43.4142V12.3619L43.4057 12.3534ZM125.243 24.6854H132.232V22.3445H127.906V19.393H132.054V17.0521H127.906V14.6943H132.232V12.3534H125.243V24.6854ZM121.621 18.0444C121.783 17.9257 121.961 17.773 122.13 17.5525C122.444 17.1539 122.716 16.5687 122.716 15.7629C122.716 14.7112 122.283 13.7274 121.537 13.1507C120.502 12.3534 119.17 12.3619 118.5 12.3619H115.362V24.6939H119.56C120.621 24.6939 121.774 24.5158 122.716 23.6846C123.589 22.9043 123.793 21.8611 123.793 21.1317C123.793 20.4786 123.648 19.4948 122.877 18.7654C122.614 18.5109 122.215 18.2141 121.613 18.0529L121.621 18.0444ZM118.034 14.584H118.551C119.001 14.584 119.425 14.6858 119.713 14.8978C120.001 15.1099 120.188 15.4322 120.188 15.9326C120.188 16.2888 120.103 16.5432 119.985 16.7383C119.798 17.0182 119.51 17.1709 119.221 17.2557C118.933 17.3405 118.661 17.3405 118.534 17.3405H118.034V14.584ZM120.917 21.5727C120.816 21.7932 120.655 21.9968 120.4 22.1495C119.925 22.4293 119.306 22.4548 118.882 22.4548H118.034V19.4608H118.738C119.247 19.4608 119.815 19.4608 120.273 19.6814C120.612 19.834 120.807 20.0545 120.917 20.2751C121.028 20.4956 121.062 20.7246 121.062 20.9027C121.062 21.1147 121.028 21.3522 120.926 21.5727H120.917ZM45.9586 24.6854H52.9473V22.3445H48.6218V19.393H52.7692V17.0521H48.6218V14.6943H52.9473V12.3534H45.9586V24.6854ZM143.656 12.3534V14.6943H146.362V24.6854H149.025V14.6943H151.731V12.3534H143.656ZM81.852 13.3118C81.394 12.9132 80.9106 12.6672 80.3763 12.523C79.8419 12.3873 79.2567 12.3449 78.5697 12.3449H74.9142V24.6769H77.5859V20.2327H78.9344C80.3508 20.2327 81.3856 19.8256 82.0895 19.1216C83.0564 18.1462 83.1242 16.8062 83.1242 16.3227C83.1242 15.4237 82.8613 14.2108 81.8435 13.3033L81.852 13.3118ZM79.808 17.5525C79.35 17.8918 78.8242 17.9003 78.3746 17.9003H77.5859V14.6943H78.2305C78.7818 14.6943 79.3585 14.7367 79.791 15.042C80.0964 15.271 80.3847 15.6696 80.3932 16.2803C80.3932 16.7553 80.1897 17.2472 79.808 17.5525ZM139.772 12.082C138.033 12.082 136.489 12.54 135.251 13.7104C134.199 14.6858 133.275 16.3058 133.275 18.5279C133.275 20.326 133.835 21.8781 135.251 23.2351C136.277 24.2104 137.617 24.9568 139.763 24.9568C141.086 24.9568 142.07 24.626 142.808 24.2359L142.893 24.1935V20.9112L142.604 21.2504C141.926 22.0392 140.985 22.5057 139.924 22.5057C138.949 22.5057 137.974 22.1579 137.236 21.4964C136.506 20.8264 136.014 19.851 136.014 18.5618C136.014 17.4932 136.396 16.4839 137.058 15.746C137.719 15.0081 138.669 14.5331 139.831 14.5331C140.247 14.5331 141.553 14.618 142.604 15.8308L142.893 16.1616V12.8877L142.808 12.8453C141.68 12.2347 140.637 12.0905 139.78 12.0905L139.772 12.082ZM92.827 20.1139V12.3619H90.1638V24.6939H92.2078L98.4078 16.8995V24.6939H101.071V12.3619H98.993L92.8185 20.1309L92.827 20.1139ZM110.596 16.9928H105.838V12.3449H103.174V24.6769H105.838V19.3336H110.596V24.6769H113.259V12.3619H110.596V17.0097V16.9928Z"
                fill="#50B848"
              />
              <Path
                d="M39.4449 4.62683C38.6561 3.93136 37.6808 3.81262 36.9514 3.81262H35.8318V1.95518H39.4958V0.0298998H33.6521V9.88532H36.9683C37.3924 9.88532 37.9098 9.85139 38.4271 9.68176C38.9445 9.51213 39.4534 9.2068 39.8435 8.65551C40.1913 8.16359 40.3948 7.53596 40.3948 6.86593C40.3948 5.92449 40.0216 5.1442 39.4449 4.62683ZM37.8758 7.58685C37.6638 7.7904 37.2652 7.96003 36.5443 7.96003H35.8233V5.74638H36.5782C37.2567 5.74638 37.6468 5.91601 37.8674 6.12805C38.0879 6.34008 38.1557 6.61997 38.1642 6.88289C38.1642 7.12885 38.0964 7.3833 37.8843 7.59533L37.8758 7.58685ZM64.9061 4.60139L69.096 0.0298998H66.3056L63.0402 3.78717V0.0298998H60.852V9.88532H63.0402V5.72942L63.0742 5.69549L66.3989 9.88532H69.2826L64.9061 4.60139ZM44.6186 0.0298998L40.4372 9.88532H42.8035L43.6517 7.8837H47.2817L48.1214 9.88532H50.4708L46.3997 0.0298998H44.6186ZM44.3641 6.04323L45.4922 3.21892L46.5947 6.04323H44.3641ZM57.0439 3.71084H53.3375V0.0298998H51.1493V9.88532H53.3375V5.6446H57.0439V9.88532H59.2236V0.0298998H57.0439V3.71932V3.71084Z"
                fill="#50B848"
              />
              <Path
                d="M13.7631 0.00445557V7.17974L19.6068 0.00445557H13.7631Z"
                fill="#50B848"
              />
              <Path
                d="M23.7712 0.996782L13.7631 13.2949V16.3566C13.7801 16.2718 13.7886 16.187 13.8055 16.1022L13.9328 15.5594C14.1702 14.7621 14.501 14.0751 15.0014 13.3881L15.3407 12.981C15.7308 12.5824 16.1125 12.2771 16.6044 11.9887C16.8589 11.853 17.1048 11.7512 17.3677 11.6495C17.953 11.4798 18.4618 11.412 19.081 11.4289L19.6577 11.5053C20.1412 11.6155 20.5313 11.7682 20.9639 11.9887C21.2014 12.1244 21.4219 12.2686 21.6339 12.4382C22.287 12.9895 22.745 13.5747 23.1351 14.2957L23.3641 14.7876C23.5507 15.2541 23.6779 15.9326 23.7627 16.3821V0.996782H23.7712Z"
                fill="#50B848"
              />
              <Path
                d="M18.7841 12.54C16.5959 12.54 14.8148 14.7791 14.8148 17.5271C14.8148 20.2751 16.5959 22.5226 18.7841 22.5226C20.9724 22.5226 22.7619 20.2835 22.7619 17.5271C22.7619 14.7706 20.9808 12.54 18.7841 12.54ZM18.7841 20.9112C17.4695 20.9112 16.3924 19.393 16.3924 17.5356C16.3924 15.6781 17.461 14.16 18.7841 14.16C20.1072 14.16 21.1844 15.6781 21.1844 17.5356C21.1844 19.393 20.1072 20.9112 18.7841 20.9112Z"
                fill="#50B848"
              />
              <Path
                d="M13.9413 19.5033L13.814 18.9604C13.7971 18.8756 13.7801 18.7908 13.7716 18.706V24.7024H23.7797V18.7399C23.6525 19.376 23.4574 20.1563 23.1521 20.7755L22.8807 21.2419C22.4736 21.8526 22.041 22.3361 21.4303 22.794L20.9724 23.0824C20.5398 23.3029 20.1412 23.4556 19.6662 23.5659C19.3694 23.6167 19.098 23.6422 18.7926 23.6507C18.394 23.6337 18.0378 23.5913 17.6476 23.498C17.3762 23.4132 17.1218 23.3199 16.8589 23.2096C16.2652 22.8958 15.8156 22.5566 15.3576 22.0901L15.0099 21.683C14.5095 20.996 14.1787 20.309 13.9413 19.5117V19.5033Z"
                fill="#50B848"
              />
              <Path
                d="M0.3116 23.71L10.3197 11.412V8.35018C10.3112 8.43499 10.2942 8.51981 10.2773 8.60462L10.1416 9.14743C9.90409 9.94468 9.57332 10.6317 9.07291 11.3187L8.72517 11.7258C8.33503 12.1244 7.95336 12.4297 7.46992 12.7181C7.21548 12.8538 6.96952 12.9556 6.70659 13.0574C6.12138 13.227 5.61249 13.2948 4.99335 13.2779L4.41661 13.2016C3.93317 13.0913 3.54302 12.9386 3.11047 12.7181C2.87299 12.5824 2.65247 12.4382 2.43196 12.2686C1.77889 11.7173 1.32937 11.1406 0.930744 10.4112L0.701745 9.91924C0.532117 9.46973 0.396414 8.79121 0.3116 8.33321V23.71Z"
                fill="#50B848"
              />
              <Path
                d="M5.2902 12.1668C7.4784 12.1668 9.2595 9.92772 9.2595 7.17974C9.2595 4.43176 7.48689 2.18418 5.2902 2.18418C3.09351 2.18418 1.32089 4.42328 1.32089 7.17974C1.32089 9.92772 3.10199 12.1668 5.2902 12.1668ZM5.2902 3.79565C6.6133 3.79565 7.68196 5.31383 7.68196 7.17974C7.68196 9.04566 6.60482 10.5553 5.2902 10.5553C3.97558 10.5553 2.89843 9.03717 2.89843 7.17974C2.89843 5.32231 3.97558 3.79565 5.2902 3.79565Z"
                fill="#50B848"
              />
              <Path
                d="M10.1416 5.20357L10.2773 5.74638C10.2942 5.8312 10.3112 5.91601 10.3197 5.99234V0.00445557H0.3116V5.97538C0.438821 5.33927 0.633894 4.5505 0.939225 3.93984L1.21063 3.47336C1.61774 2.8627 2.05029 2.37925 2.66095 1.92126L3.11895 1.63289C3.5515 1.41237 3.94165 1.25971 4.42509 1.14945C4.72194 1.09856 4.99335 1.07312 5.29868 1.06463C5.70579 1.07312 6.05352 1.124 6.44367 1.2173C6.71508 1.30211 6.96952 1.39541 7.23244 1.50567C7.82614 1.81948 8.28414 2.15874 8.73365 2.6337L9.08139 3.04081C9.5818 3.7278 9.90409 4.4148 10.1501 5.21205L10.1416 5.20357Z"
                fill="#50B848"
              />
              <Path
                d="M10.3197 17.5356L4.47598 24.6939H10.3197V17.5356Z"
                fill="#50B848"
              />
              <Path
                d="M20.9469 0.00445557L0.888337 24.6939H3.10199L23.203 0.00445557H20.9469Z"
                fill="#50B848"
              />
              <Path
                d="M12.8896 22.9976H11.1933V24.6939H12.8896V22.9976Z"
                fill="#50B848"
              />
              <Path
                d="M24.772 22.9976V24.6939C25.9425 24.6939 26.7652 25.805 26.7652 26.9669C26.7652 28.1289 25.8068 29.2314 24.6363 29.2314C23.7712 29.2314 22.9825 29.0364 21.3455 28.6377C18.165 27.8575 14.2551 26.8991 11.1254 26.1357C5.49375 24.7533 0.337044 26.3138 0.3116 29.9693H2.02485C2.02485 28.6123 4.66257 27.7048 10.3027 29.0873C15.1795 30.2831 17.0115 30.7327 20.684 31.6317C23.1097 32.2254 25.0943 32.0812 26.5277 31.4027C27.961 30.7157 28.9364 29.0364 28.9364 27.3655C28.9364 25.0162 27.1383 22.9976 24.7635 22.9976H24.772Z"
                fill="#50B848"
              />
            </G>
            <Defs>
              <ClipPath id="clip0_54499_35618">
                <Rect
                  width="151.771"
                  height="32"
                  fill="white"
                  transform="translate(0.114288)"
                />
              </ClipPath>
            </Defs>
          </Svg>
        </View>
        <Text style={styles.title}>Авторизация</Text>
        <Text style={styles.subtitle}>Войдите в приложение через аккаунт в Госуслугах</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gosuslugi")}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <Path
              d="M15.5962 6.47578C15.5385 5.70276 14.9615 4.71171 14.3846 4.236C13.7359 3.74917 13.0618 3.29922 12.3654 2.88817C11.6743 2.46596 10.9617 2.0822 10.2308 1.73855C9.84033 1.57438 9.42165 1.49347 9.00002 1.50069C8.57823 1.49156 8.15918 1.57255 7.76925 1.73855C7.03843 2.08244 6.32588 2.46619 5.63464 2.88817C4.51926 3.58191 3.61542 4.236 3.61542 4.236C3.18297 4.60903 2.84609 5.07964 2.62757 5.60633C2.5478 5.79859 2.6942 6 2.89821 6H3.46739C3.69409 6 3.89783 5.86811 4.02765 5.67782C4.17497 5.46188 4.35044 5.26511 4.55073 5.09352C4.55073 5.09352 5.29702 4.55716 6.21797 3.9883C6.78871 3.64228 7.37704 3.3276 7.98047 3.04561C8.30242 2.90949 8.64843 2.84308 8.99669 2.85057C9.34482 2.84465 9.69051 2.91099 10.0129 3.04561C10.6164 3.3274 11.2048 3.64209 11.7754 3.9883C12.3504 4.32536 12.907 4.69432 13.4426 5.09352C13.919 5.4836 14.3953 6.29626 14.443 6.93014C14.443 6.93014 14.5541 7.87283 14.57 8.98943C14.569 9.67903 14.5319 10.3681 14.4589 11.0536C14.3481 11.7714 13.9871 12.4238 13.4426 12.8902C13.4426 12.8902 12.6964 13.4428 11.7754 14.0117C11.2047 14.3577 10.6163 14.6724 10.0129 14.9544C9.69095 15.0905 9.34495 15.1569 8.99669 15.1494C8.64888 15.1569 8.3032 15.0922 7.98047 14.9593C7.37695 14.6775 6.7886 14.3628 6.21797 14.0166C5.29702 13.464 4.55073 12.8951 4.55073 12.8951C4.37344 12.7499 4.19614 12.5462 4.04013 12.3149C3.91342 12.1271 3.71174 12 3.48879 12H2.90613C2.6995 12 2.55398 12.2058 2.63989 12.3982C2.87808 12.9317 3.24675 13.4461 3.61542 13.7501C3.61542 13.7501 4.51926 14.4438 5.63464 15.1178C6.32576 15.54 7.03831 15.9237 7.76925 16.2674C8.16012 16.4295 8.57878 16.5084 9.00002 16.4993C9.42181 16.5084 9.84086 16.4274 10.2308 16.2614C10.9616 15.9175 11.6742 15.5338 12.3654 15.1118C13.4808 14.4181 14.3846 13.7442 14.3846 13.7442C15.044 13.1754 15.4812 12.3797 15.6154 11.5044C15.7039 10.6684 15.7488 9.82808 15.75 8.98711C15.7308 7.6254 15.5962 6.47578 15.5962 6.47578Z"
              fill="url(#paint0_linear_54551_479)"
            />
            <Path
              d="M2.2501 7.35071C2.2501 7.18503 2.38143 7.05071 2.54343 7.05071H7.09009C7.25209 7.05071 7.38342 7.18503 7.38342 7.35071V8.25071C7.38342 8.4164 7.25209 8.55071 7.09009 8.55071H2.2501V7.35071Z"
              fill="#0066B3"
            />
            <Path
              d="M2.25 9.45048H11.49C11.652 9.45048 11.7833 9.5848 11.7833 9.75048V10.6505C11.7833 10.8162 11.652 10.9505 11.49 10.9505H2.54333C2.38133 10.9505 2.25 10.8162 2.25 10.6505V9.45048Z"
              fill="#EE2F53"
            />
            <Defs>
              <LinearGradient
                id="paint0_linear_54551_479"
                x1="9"
                y1="1.5"
                x2="9"
                y2="16.5"
                gradientUnits="userSpaceOnUse"
              >
                <Stop stop-color="#0066B3" />
                <Stop offset="0.354167" stop-color="#0066B3" />
                <Stop offset="0.6875" stop-color="#EE2F53" />
                <Stop offset="1" stop-color="#EE2F53" />
              </LinearGradient>
            </Defs>
          </Svg>
          <Text style={styles.button__text}>Войти через Госуслуги</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },

  button: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingVertical: 10,
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    borderColor: "#75777F",
    borderStyle: "solid",
    borderWidth: 1,
    height: 52
  },

  button__text: {
    color: "#1B1B1F",
    fontSize: 14,
    fontWeight: '500'
  },

  center_invest_label: {
    position: 'absolute',
    top: 32,
    left: '50%',
    right: '50%',
    width: 152,
    transform: [{translateX: -76}]
  },

  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#1B1B1F',
    marginBottom: 8
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1B1B1F',
    marginBottom: 24,
    textAlign: 'center'
  }
});
