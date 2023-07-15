import React from "react";
import { Box, Pressable, Spinner } from "native-base";
import { useGetAllProducts } from "../hooks/api/useGetAllProducts";
import { useState, useRef } from "react";
import { Modal } from "native-base";
import Card from "../components/Crad";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import UpdateProduct from "../components/forms/UpdateProduct";
// // OR
// import { ScrollView, FlatList } from 'react-native-gesture-handler';

export default function AllProducts() {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const {
    isLoading: isAllProductsLoading,
    data: allProductsData,
    refetch: refetchAllProducts,
  } = useGetAllProducts();
  console.log(allProductsData?.data);
  return (
    <View>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Update Product</Modal.Header>
          <Modal.Body>
            <UpdateProduct
              ref={initialRef}
              setModal={setModalVisible}
              oldData={selectedProduct}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Box display={"flex"} flexDir={"column"}>
        {isAllProductsLoading ? (
          <Spinner color="emerald.500" />
        ) : (
          <>
            <SafeAreaView>
              <ScrollView>
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
                  keyExtractor={item => item?.id}
                />
              </ScrollView>
            </SafeAreaView>
          </>
        )}
      </Box>
    </View>
  );
}
