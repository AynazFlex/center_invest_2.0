import { useFocusEffect } from "@react-navigation/native";
import BottomNav from "./components/BottomNav";
import ScreenWrapper from "./components/ScreenWrapper";
import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTransactions, resetError } from "../store/dataReducer";
import LoadElem from "./components/LoadElem";
import CashbackIcon from "./components/CashbackIcon";
import { G, Path, Svg, Circle } from "react-native-svg";
import { colorForCategories, convertMonth } from "../store/dataReducer";
import vw from "../assets/functions/vw";
import ErrorElem from "./components/ErrorElem";
import font from "../assets/functions/font";
import border from "../assets/functions/border";

const PieChart = ({ data, chartHeight, chartWidth, totalValue }) => {
  const radius = chartHeight / 2;
  const centerX = chartWidth / 2;
  const centerY = radius;
  const categoriesMap = new Map();

  let startAngle = 0;

  const renderSegments = () =>
    data.map((item, index) => {
      const percentage = item.value / totalValue;
      categoriesMap.set(item.label, percentage * 100);
      const angle = Math.PI * 2 * percentage;

      const endAngle = startAngle + angle;

      const startX = centerX + Math.cos(startAngle) * radius;
      const startY = centerY + Math.sin(startAngle) * radius;

      const endX = centerX + Math.cos(endAngle) * radius;
      const endY = centerY + Math.sin(endAngle) * radius;

      const largeArcFlag = angle > Math.PI ? 1 : 0;

      const pathData = `M${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} L${centerX},${centerY}`;

      startAngle = endAngle;

      return <Path key={index} d={pathData} fill={item.color} />;
    });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <View style={{ width: chartWidth, height: chartHeight }}>
        <Svg height={chartHeight} width={chartWidth}>
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="transparent"
            stroke="gray"
            strokeWidth="1"
          />
          {renderSegments()}
        </Svg>
      </View>
      <View>
        {[...categoriesMap].map(([label, value]) => (
          <View key={label} style={styles.shopping__statistics_category}>
            <View
              style={{
                height: vw(16),
                width: vw(16),
                borderRadius: vw(8),
                backgroundColor: colorForCategories[label],
              }}
            />
            <CashbackIcon size={vw(16)} name={label} />
            <Text style={styles.shopping__statistics_value}>
              {value.toFixed(1)}% ~ {((totalValue * value) / 100).toFixed(2)}₽
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// const sortByDate = (transactions, k) => {
//   const map = new Map();
//   const mapOfCategories = new Map();
//   const mapForDiagram = new Map();
//   let totalBack = 0;

//   const converDate = (time) => {
//     const date = new Date(time);
//     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
//   };

//   transactions.forEach((item) => {
//     const { account_number, bank, transactions } = item;
//     transactions.forEach((transaction) => {
//       const { category, time, value, name } = transaction;
//       const kef = k[bank][category];
//       if (kef) {
//         const date = converDate(time);
//         const back = (kef * value) / 100;
//         totalBack += back;
//         const object = {
//           account_number,
//           bank,
//           transaction: {
//             time,
//             name,
//             value,
//             category,
//             back,
//           },
//         };

//         if (mapForDiagram.has(category)) {
//           mapForDiagram.set(category, mapForDiagram.get(category) + back);
//         } else {
//           mapForDiagram.set(category, back);
//         }

//         if (mapOfCategories.has(category)) {
//           mapOfCategories.set(category, mapOfCategories.get(category) + 1);
//         } else {
//           mapOfCategories.set(category, 1);
//         }

//         if (map.has(date)) {
//           map.set(date, [...map.get(date), object]);
//         } else {
//           map.set(date, [object]);
//         }
//       }
//     });
//   });

//   const maxCategories = () => {
//     const arr = [...mapOfCategories];
//     console.log(arr);
//     return arr.reduce(
//       (obj, i) =>
//         i[1] > obj.total
//           ? {
//               category: i[0],
//               total: i[1],
//             }
//           : obj,
//       {
//         category: arr[0][0],
//         total: arr[0][1],
//       }
//     );
//   };

//   return {
//     data: [...map].sort((a, b) => new Date(b[0]) - new Date(a[0])),
//     totalBack,
//     mostPopularCategories: maxCategories().category,
//     diagram: [...mapForDiagram].reduce(
//       (res, [label, value]) => [
//         ...res,
//         {
//           label,
//           value,
//           color: colorForCategories[label],
//         },
//       ],
//       []
//     ),
//   };
// };

const Item = ({ item, navigation }) => {
  const date = new Date(item[0]);
  const converDate = `${date.getDate()} ${
    convertMonth[date.getMonth()]
  } ${date.getFullYear()}`;

  return (
    <View style={styles.shopping__item}>
      <Text style={styles.shopping__item_text}>{converDate}</Text>
      {item[1].map((i, index) => (
        <Pressable
          onPress={() => navigation.navigate("Transaction", { ...i })}
          style={styles.shopping__item_wrapper}
          key={i.transaction.time + index}
        >
          <View style={styles.shopping__item_icon}>
            <CashbackIcon size={vw(16)} name={i.transaction.category} />
          </View>
          <View style={{ flexGrow: 1 }}>
            <View style={styles.shopping__item_top}>
              <Text style={styles.shopping__item_top_text}>
                {i.transaction.name.length > 10
                  ? i.transaction.name.slice(0, 10) + "..."
                  : i.transaction.name}
              </Text>
              <Text style={styles.shopping__item_back}>
                +{i.transaction.back}
              </Text>
              <Text
                style={[styles.shopping__item_top_text, { marginLeft: "auto" }]}
              >
                -{i.transaction.value} ₽
              </Text>
            </View>
            <View style={styles.shopping__item_bottom}>
              <Text style={styles.shopping__item_bottom_text}>
                {i.transaction.category}
              </Text>
              <Text style={styles.shopping__item_bottom_text}>{i.bank}</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const ListItems = ({ data, diagram, navigation }) => {
  const [category, setCategory] = useState(null);

  return (
    <>
      <View style={[styles.shopping__statistics_wrapper, { marginTop: 8 }]}>
        <View style={styles.shopping__catigories}>
          {diagram.map(({ label }) => (
            <Pressable
              onPress={() => {
                setCategory((prev) => (prev === label ? null : label));
              }}
              key={label}
              style={[
                styles.shopping__statistics_category,
                { borderColor: category === label ? "black" : "#FAF9FD" },
              ]}
            >
              <CashbackIcon size={vw(16)} name={label} />
            </Pressable>
          ))}
        </View>
        <Text style={styles.shopping__statistics_text}>Категории</Text>
      </View>
      <FlatList
        style={styles.shopping}
        showsVerticalScrollIndicator={false}
        data={
          category
            ? data.reduce((arr, [date, second]) => {
                const filter_by_category = second.filter(
                  ({ transaction }) => transaction.category === category
                );
                if (filter_by_category.length)
                  arr.push([date, filter_by_category]);
                return arr;
              }, [])
            : data
        }
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item) => item[0]}
      />
    </>
  );
};

export default function Statistics({ navigation }) {
  const { error_msg, transactions, statistics } = useSelector(
    ({ data }) => data
  );
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      transactions || dispatch(getTransactions());
    }, [transactions])
  );

  if (error_msg)
    return (
      <ErrorElem
        callback={() => {
          navigation.goBack();
          dispatch(resetError());
        }}
        error_msg={error_msg}
      />
    );

  if (!transactions) {
    return <LoadElem />;
  }

  const { data, totalBack, mostPopularCategories, diagram } = statistics;

  if (!data.length)
    return (
      <ErrorElem
        callback={() => {
          navigation.goBack();
        }}
        error_msg="У вас еще не было транзакций"
      />
    );

  return (
    <ScreenWrapper>
      <View style={[styles.shopping__statistics_wrapper, { marginTop: 16 }]}>
        <PieChart
          data={diagram}
          chartHeight={150}
          chartWidth={150}
          totalValue={totalBack}
        />
      </View>
      <View style={styles.shopping__statistics}>
        <View style={styles.shopping__statistics_wrapper}>
          <View style={styles.shopping__statistics_total}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={vw(16)}
              height={vw(16)}
              viewBox="0 0 16 16"
              fill="none"
            >
              <G clipPath="url(#clip0_54500_37051)">
                <Path
                  d="M6.00004 5.99998H6.00671M10 9.99998H10.0067M10.6667 5.33331L5.33337 10.6666M4.88922 2.54578C5.42511 2.50301 5.93385 2.29228 6.34302 1.94359C7.29786 1.12989 8.70222 1.12989 9.65706 1.94359C10.0662 2.29228 10.575 2.50301 11.1109 2.54578C12.3614 2.64557 13.3544 3.63861 13.4542 4.88916C13.497 5.42505 13.7077 5.93379 14.0564 6.34296C14.8701 7.2978 14.8701 8.70216 14.0564 9.657C13.7077 10.0662 13.497 10.5749 13.4542 11.1108C13.3544 12.3614 12.3614 13.3544 11.1109 13.4542C10.575 13.4969 10.0662 13.7077 9.65706 14.0564C8.70222 14.8701 7.29786 14.8701 6.34302 14.0564C5.93385 13.7077 5.42511 13.4969 4.88922 13.4542C3.63867 13.3544 2.64563 12.3614 2.54584 11.1108C2.50307 10.5749 2.29235 10.0662 1.94365 9.657C1.12995 8.70216 1.12995 7.2978 1.94365 6.34296C2.29235 5.93379 2.50307 5.42505 2.54584 4.88916C2.64563 3.63861 3.63867 2.64557 4.88922 2.54578ZM6.33337 5.99998C6.33337 6.18407 6.18414 6.33331 6.00004 6.33331C5.81595 6.33331 5.66671 6.18407 5.66671 5.99998C5.66671 5.81588 5.81595 5.66665 6.00004 5.66665C6.18414 5.66665 6.33337 5.81588 6.33337 5.99998ZM10.3334 9.99998C10.3334 10.1841 10.1841 10.3333 10 10.3333C9.81595 10.3333 9.66671 10.1841 9.66671 9.99998C9.66671 9.81588 9.81595 9.66665 10 9.66665C10.1841 9.66665 10.3334 9.81588 10.3334 9.99998Z"
                  stroke="#201C00"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </G>
            </Svg>
            <Text style={styles.shopping__statistics_value}>
              {totalBack.toFixed(1)} ₽
            </Text>
          </View>
          <Text style={styles.shopping__statistics_text}>
            Накоплено кешбэка
          </Text>
        </View>
        <View style={[styles.shopping__statistics_wrapper, { flexGrow: 1 }]}>
          <View style={styles.shopping__statistics_category}>
            <CashbackIcon size={vw(16)} name={mostPopularCategories} />
            <Text style={styles.shopping__statistics_value}>
              {mostPopularCategories}
            </Text>
          </View>
          <Text style={styles.shopping__statistics_text}>
            Самая популярная категория
          </Text>
        </View>
      </View>
      <ListItems data={data} diagram={diagram} navigation={navigation} />
      <BottomNav navigation={navigation} active_sreen="Statistics" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  shopping: {
    marginTop: 8,
    marginBottom: vw(32) + 32,
  },

  shopping__item: {
    marginBottom: 12,
    flexDirection: "column",
    gap: 8,
  },

  shopping__item_text: {
    ...font(14, "500", "#44474F"),
  },

  shopping__item_wrapper: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  shopping__item_icon: {
    borderRadius: 16,
    padding: 8,
    backgroundColor: "#EFEDF1",
  },

  shopping__item_top: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  shopping__item_bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  shopping__item_top_text: {
    ...font(14, "500", "#1B1B1F"),
  },

  shopping__item_bottom_text: {
    ...font(12, "400", "#44474F"),
  },

  shopping__item_back: {
    ...font(12, "500", "#201C00"),
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 20,
    backgroundColor: "#FBE505",
  },

  shopping__statistics_wrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#EFEDF1",
  },

  shopping__catigories: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  shopping__statistics: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  shopping__statistics_total: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FBE505",
    borderRadius: 16,
    marginBottom: 8,
  },

  shopping__statistics_value: {
    ...font(12, "500", "#201C00"),
  },

  shopping__statistics_text: {
    ...font(12, "400", "#1B1B1F"),
  },

  shopping__statistics_category: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    ...border(2, "solid", "#FAF9FD"),
    backgroundColor: "#FAF9FD",
    borderRadius: 16,
    marginBottom: 8,
  },
});
