import { useState } from "react";
import {
  SafeAreaView,
  TouchableHighlight,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { primaryColor } from "../contants/global";
import useComidas from "../hooks/useComidas";
import useAlmuerzos from "../hooks/useAlmuerzos";

export default function DishSearch({ navigation, route }) {
  const { updateComidas } = useComidas();
  const { updateDishFromAlmuerzoByDate } = useAlmuerzos();
  const [comidasFiltered, setComidasFiltered] = useState(route.params.comidas);
  const [currentDishName, setCurrentDishName] = useState(
    route.params.comidas.find((cmd) => cmd.id === route.params.d)?.name || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const selectDishFromTheList = async (dishId, dishName) => {
    setIsLoading(true);
    const { mondayDate, wd, comidas, task } = route.params;
    let almuerzoObject = { wd, d: dishId };
    if (dishId === "new") {
      let lastDishId = 0;
      route.params.comidas.forEach(({ id }) => {
        lastDishId = id > lastDishId ? id : lastDishId;
      });
      almuerzoObject.d = lastDishId + 1;
      const dishObject = {
        id: lastDishId + 1,
        name: dishName.trim().toLowerCase(),
      };
      const newComidas = [...comidas, dishObject];
      await updateComidas(newComidas);
    }
    await updateDishFromAlmuerzoByDate(task, mondayDate, almuerzoObject);
    setIsLoading(false);
    navigation.goBack("Home");
  };
  const searchFilterFunction = (newInputText) => {
    if (Boolean(newInputText.trim())) {
      const newData = route.params.comidas.filter((item) => {
        const itemData = item.name ? item.name.trim().toUpperCase() : "";
        const textData = newInputText.trim().toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if (newData.length === 0) {
        setComidasFiltered([{ id: "new", name: newInputText.trim() }]);
      } else {
        setComidasFiltered(newData);
      }
      setCurrentDishName(newInputText);
    } else {
      setComidasFiltered(route.params.comidas);
      setCurrentDishName(newInputText);
    }
  };

  const ItemView = ({ item }) => (
    <TouchableHighlight
      style={styles.itemStyle}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => selectDishFromTheList(item.id, item.name)}
    >
      <Text style={styles.itemTextStyle}>{item.name}</Text>
    </TouchableHighlight>
  );

  const ItemSeparatorView = () => (
    <View
      style={{
        height: 1.5,
        width: "100%",
        backgroundColor: "rgba(156,134,246, 0.5)",
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40, backgroundColor: "white" }}>
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.containerLoadingStyle}>
            <ActivityIndicator size={50} color="white" />
            <Text style={styles.textLoadingStyle}>Cargando...</Text>
          </View>
        )}
        <SearchBar
          inputStyle={styles.inputSearch}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.inputContainerSearch}
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Escribe aquí..."
          value={currentDishName}
        />
        <ItemSeparatorView />
        <FlatList
          data={comidasFiltered}
          keyExtractor={(_, idx) => idx.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        <ItemSeparatorView />
      </View>
    </SafeAreaView>
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
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  inputSearch: {
    backgroundColor: "white",
    fontSize: 22.5,
    color: primaryColor,
    fontWeight: "bold",
  },
  inputContainerSearch: {
    backgroundColor: "white",
  },
  searchBar: {
    backgroundColor: "white",
    borderColor: "white",
    borderTopColor: "white",
    borderBottomColor: "white",
  },
  itemStyle: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  itemTextStyle: {
    color: "#505050",
    textTransform: "lowercase",
    fontSize: 20,
  },
});
