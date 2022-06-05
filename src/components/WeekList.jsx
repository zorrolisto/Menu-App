import React from "react";
import { View, StyleSheet } from "react-native";
import WeekDay from "./WeekDay.jsx";

export default function WeekList({ almuerzos, comidas, goToDishSearch }) {
  return (
    <View style={styles.container}>
      {almuerzos.map((almuerzo, index) => (
        <WeekDay
          key={index}
          numberOfWeekDay={almuerzo.wd}
          dishName={comidas.find((cm) => cm.id === almuerzo.d)?.name}
          goToDishSearch={() => goToDishSearch(almuerzo)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "72.5%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
