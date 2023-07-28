import { StyleSheet } from "react-native";

import { ScrollView } from "react-native";
import { View } from "../../components/Themed";
import RackDetails from "../rack-details";

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <RackDetails />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
