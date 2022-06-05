import { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import WeekList from "./WeekList";
import Header from "./Header";
import Footer from "./Footer";
import useComidas from "../hooks/useComidas";
import useAlmuerzos from "../hooks/useAlmuerzos";
import {
  getDateOfThisMonday,
  goBackSevenDaysADate,
  goForwardSevenDaysADate,
} from "../utilities/date";
import { useIsFocused } from "@react-navigation/native";

const thisMondayDate = getDateOfThisMonday();
export default function Main({ navigation }) {
  const isFocused = useIsFocused();
  const [mondayDate, setMondayDate] = useState(thisMondayDate);
  const [isShowingThisWeek, setIsShowingThisWeek] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { comidas, getComidas } = useComidas();
  const { almuerzos, task, setAlmuerzos, getAlmuerzosByDate } = useAlmuerzos();

  useEffect(() => {
    initMainPage();
  }, [isFocused]);

  const initMainPage = async () => {
    setIsLoading(true);
    await getComidas();
    await getAlmuerzosByDate(mondayDate);
    setIsLoading(false);
  };
  const getNextWeekAlmuerzos = async () => {
    const nextWeekMondayDate = goForwardSevenDaysADate(mondayDate);
    setMondayDate(nextWeekMondayDate);
    setIsShowingThisWeek(nextWeekMondayDate === thisMondayDate);
    if (task.content.includes(nextWeekMondayDate)) {
      setAlmuerzos(JSON.parse(task.description)[`${nextWeekMondayDate}`]);
    } else {
      setIsLoading(true);
      await getAlmuerzosByDate(nextWeekMondayDate);
      setIsLoading(false);
    }
  };
  const getPreviousWeekAlmuerzos = async () => {
    const previousWeekMondayDate = goBackSevenDaysADate(mondayDate);
    setMondayDate(previousWeekMondayDate);
    setIsShowingThisWeek(previousWeekMondayDate === thisMondayDate);
    if (task.content.includes(previousWeekMondayDate)) {
      setAlmuerzos(JSON.parse(task.description)[`${previousWeekMondayDate}`]);
    } else {
      setIsLoading(true);
      await getAlmuerzosByDate(previousWeekMondayDate);
      setIsLoading(false);
    }
  };
  const goToDishSearch = (almuerzoSelected) => {
    navigation.navigate("DishSearch", {
      ...almuerzoSelected,
      task,
      comidas,
      mondayDate,
    });
  };

  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      {isLoading && (
        <View style={styles.containerLoadingStyle}>
          <ActivityIndicator size={50} color="white" />
          <Text style={styles.textLoadingStyle}>Cargando...</Text>
        </View>
      )}
      <Header weekDate={mondayDate} isShowingThisWeek={isShowingThisWeek} />
      <WeekList
        almuerzos={almuerzos}
        comidas={comidas}
        goToDishSearch={goToDishSearch}
      />
      <Footer
        goNextWeek={getNextWeekAlmuerzos}
        goPreviousWeek={getPreviousWeekAlmuerzos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLoadingStyle: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999,
    backgroundColor: "rgba(0,0,0, 0.3)",
  },
  iconLoadingStyle: {},
  textLoadingStyle: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
});
