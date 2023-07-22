import React, { useState } from "react";
import { Box, Button, Spinner, Text } from "native-base";
import { useLocalSearchParams } from "expo-router";
import { useGetCellInfo } from "../../hooks/api/useGetCellInfo";
import { ScrollView } from 'react-native-virtualized-view';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TransactionCard from "../../components/TransactionCard";
import dayjs from "dayjs";
import AddTransaction from "../../components/forms/AddTransaction";
import UpdateTransaction from "../../components/forms/UpdateTransaction";

function CellDetails() {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
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
        visible={createModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setCreateModalVisible(false)}
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
                Add Transaction
              </Text>
              <Pressable>
                <FontAwesome
                  name="window-close"
                  size={30}
                  color={"black"}
                  onPress={() => setCreateModalVisible(false)}
                />
              </Pressable>
            </Box>
            <AddTransaction setModal={setCreateModalVisible} cellId={parseInt(id?.toString())}/>
          </View>
        </View>
      </Modal>
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
            <UpdateTransaction setModal={setModalVisible} oldData={selectedTransaction}/>
          </View>
        </View>
      </Modal>
      <Box display={"flex"} flexDir={"column"} bg={'#010101'}>
        {isCellInfoLoading ? (
          <Spinner color="emerald.500" size="lg" mt={10} />
        ) : (
          <>
            <SafeAreaView>
                <ScrollView>

              <Box
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                mt={5}
              >
                <>
                  <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={'space-evenly'} width={'100%'}>
                    <Text color={"white"} fontWeight={600} fontSize={22}>Cell ID: {id}</Text>
                    <Pressable>
                      <Button
                        colorScheme="success"
                        //    isLoading={isLoading}
                        onPress={() => setCreateModalVisible(true)}
                        leftIcon={
                          <FontAwesome
                            name="plus-circle"
                            size={20}
                            color={"#f3f4f6"}
                            style={{ marginRight: 5 }}
                          />
                        }
                      >
                        Add
                      </Button>
                    </Pressable>
                  </Box>
                </>
                {
                    cellData?.data?.cellInfo?.transactions?.length > 0  ? (
                <>
                <Text color={"white"} fontWeight={600} fontSize={18} mt={5}>Transaction List - </Text>
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
                        timestamp={dayjs(item?.timestamp).format(
                          "DD/MM/YYYY (h:ma)"
                        )}
                        transactionId={item?.transactionId}
                      />
                    </Pressable>
                  )}
                  keyExtractor={item => `${item?.transactionId}-${item?.action_type}`}
                />
                </>
                    ): <Text color={"#35363a"} fontWeight={600} fontSize={18} mt={5}>No Transactions</Text>
                }
              </Box>
                </ScrollView>
            </SafeAreaView>
          </>
        )}
      </Box>
    </>
  );
}

export default CellDetails;
