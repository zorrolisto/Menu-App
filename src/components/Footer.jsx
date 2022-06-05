import React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import { primaryColor } from "../contants/global";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Footer({ goNextWeek, goPreviousWeek }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={goPreviousWeek} style={styles.touchable}>
        <View style={styles.button}>
          <Icon name="chevron-left" size={25} color="white" />
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={goNextWeek} style={styles.touchable}>
        <View style={styles.button}>
          <Icon name="chevron-right" size={25} color="white" />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "12.5%",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 60,
  },
  button: {
    borderRadius: 60,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryColor,
  },
});
