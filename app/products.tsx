import React from "react";
import { Box, Pressable, Spinner } from "native-base";
import { useGetAllProducts } from "../hooks/api/useGetAllProducts";
import { useState, useRef } from "react";
import Card from "../components/Crad";
import { ScrollView } from "react-native-virtualized-view";
import { View, StyleSheet, SafeAreaView, FlatList, Modal } from "react-native";
import UpdateProduct from "../components/forms/UpdateProduct";
import { Text } from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// // OR
// import { ScrollView, FlatList } from 'react-native-gesture-handler';

export default function AllProducts({ allProductsData, isAllProductsLoading }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        style={{
          marginTop: 22,
          marginBottom: 22,
        }}
      >
        <View style={styles.modalView}>
          {/* <Modal.CloseButton /> */}
          <View>
            <Box display={"flex"} flexDir={"row"}>
              <Text fontSize={20} fontWeight={600} minW={"90%"}>
                Update Product
              </Text>
              <Pressable>
                <FontAwesome
                  name="window-close"
                  size={30}
                  color={"black"}
                  onPress={() => setModalVisible(false)}
                />
              </Pressable>
            </Box>
            <UpdateProduct
              ref={initialRef}
              setModal={setModalVisible}
              oldData={selectedProduct}
            />
          </View>
        </View>
      </Modal>
      <Box display={"flex"} flexDir={"column"} bg={"#202020"}>
        {isAllProductsLoading ? (
          <Spinner color="emerald.500" size="lg" mt={10} />
        ) : (
          <>
            <SafeAreaView>
              <Box
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <FlatList
                  data={allProductsData?.data?.products}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setSelectedProduct(item);
                        setModalVisible(true);
                      }}
                    >
                      <Card
                        name={item?.name}
                        color={item?.color}
                        qty={item?.total_qty}
                        type={item?.type}
                        style={item?.style}
                      />
                    </Pressable>
                  )}
                  keyExtractor={item => `${item?.id}-${item?.name}`}
                />
              </Box>
            </SafeAreaView>
          </>
        )}
      </Box>
    </>
  );
}
