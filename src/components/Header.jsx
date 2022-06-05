import React from "react";
import { Text, View } from "react-native";
import { primaryColor } from "../contants/global";

export default function Header({ weekDate, isShowingThisWeek }) {
  return (
    <View style={{ height: "15%", padding: 20 }}>
      <Text style={{ color: primaryColor, fontWeight: "bold", fontSize: 45 }}>
        MI MENU
      </Text>
      <Text style={{ color: "#A78787", fontSize: 22.5 }}>
        {isShowingThisWeek ? "Esta semana" : weekDate}
      </Text>
    </View>
  );
}
