import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import AllProducts from "../products";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useGetAllProducts } from "../../hooks/api/useGetAllProducts";

export default function TabOneScreen() {
  const {
    isLoading: isAllProductsLoading,
    data: allProductsData,
    refetch: refetchAllProducts,
  } = useGetAllProducts();
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isAllProductsLoading}
            onRefresh={() => {
              console.log("on refresh");
              refetchAllProducts();
            }}
          />
        }
      >
        <AllProducts
          allProductsData={allProductsData}
          isAllProductsLoading={isAllProductsLoading}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#202020",
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
