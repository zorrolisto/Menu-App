import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Main";
import DishSearch from "./DishSearch";

const Stack = createNativeStackNavigator();

export default function NavigationComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="DishSearch" component={DishSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
