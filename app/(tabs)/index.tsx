import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { Box, Button } from "native-base";
import { Link } from "expo-router";
import AllProducts from "../products";
import { ScrollView } from 'react-native-virtualized-view';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AllProducts />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#202020',
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
