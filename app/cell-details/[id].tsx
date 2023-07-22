import React, { useState } from "react";
import { Box, Pressable, Spinner, Text } from "native-base";
import { useLocalSearchParams } from "expo-router";
import { useGetCellInfo } from "../../hooks/api/useGetCellInfo";
import { FlatList, Modal, SafeAreaView, StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TransactionCard from "../../components/TransactionCard";
import dayjs from 'dayjs'

function CellDetails() {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
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
  const {
    isLoading: isCellInfoLoading,
    data: cellData,
    refetch: refetchCellInfo,
  } = useGetCellInfo(parseInt(id?.toString()));
  console.log(cellData?.data?.cellInfo);
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
                Update Transaction
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
          </View>
        </View>
      </Modal>
      <Box display={"flex"} flexDir={"column"}>
        {isCellInfoLoading ? (
          <Spinner color="emerald.500" size="lg" mt={10} />
        ) : (
          <>
            <SafeAreaView>
              <Box
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                mt={5}
              >
                <FlatList
                  data={cellData?.data?.cellInfo?.transactions}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setSelectedTransaction(item);
                        setModalVisible(true);
                      }}
                    >
                      <TransactionCard
                        actionType={item?.action_type}
                        productId={item?.product_id}
                        qty={item?.qty}
                        timestamp={dayjs(item?.timestamp).format('DD/MM/YYYY(h:ma)')}
                        transactionId={item?.transactionId}
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

export default CellDetails;
