import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { primaryColor, weekDaysArray } from "../contants/global";

export default function WeekDay({ numberOfWeekDay, dishName, goToDishSearch }) {
  return (
    <View style={styles.container}>
      <View style={styles.dayLetterContainer}>
        <Text style={styles.dayLetterText}>
          {weekDaysArray[numberOfWeekDay - 1]}
        </Text>
      </View>
      <View style={styles.dishNameContainer}>
        <Text style={styles.dishNameText}>{dishName || "Escoger plato"}</Text>
      </View>
      <TouchableHighlight
        style={styles.editContainer}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={goToDishSearch}
      >
        <Icon name="pencil" size={30} color={primaryColor} />
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dayLetterContainer: {
    width: 60,
    height: 60,
    borderColor: primaryColor,
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 7.5,
    justifyContent: "center",
  },
  dayLetterText: {
    color: primaryColor,
    fontSize: 30,
  },
  dishNameContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  dishNameText: {
    fontSize: 20,
  },
  editContainer: {
    borderRadius: 60,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
