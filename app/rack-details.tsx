import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";
import { Box, Spinner, Text } from "native-base";
import React, { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import RackCard from "../components/RackCard";
import { useGetRacks } from "../hooks/api/useGetRacks";

export default function RackDetails() {
  const router = useRouter();
  const {
    isLoading: isRacksLoading,
    data: allRacksData,
    refetch: refetchRacks,
  } = useGetRacks();
  console.log(allRacksData?.data?.racks);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRack, setSelectedRack] = useState<any>({});
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "#333333",
      color: "white",
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
              <Text fontSize={20} fontWeight={600} minW={"90%"} color={"white"}>
                {selectedRack?.rack_name} - Cells
              </Text>
              <Pressable>
                <FontAwesome
                  name="window-close"
                  size={30}
                  color={"white"}
                  onPress={() => setModalVisible(false)}
                />
              </Pressable>
            </Box>
            <Box display={"flex"} flexDir={"row"} flexWrap={"wrap"} mt={10}>
              {selectedRack?.cells?.split(",")?.map(item => (
                <Pressable
                  onPress={() => {
                    router.push(`/cell-details/${item}`);
                    setModalVisible(false);
                  }}
                >
                  <Link
                    href={`/cell-details/${item}`}
                    asChild
                    onPress={() => setModalVisible(false)}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      px={5}
                      py={5}
                      w={"120px"}
                      height={"70px"}
                      m={2}
                      borderRadius={5}
                      bgColor={"#4285f4"}
                    >
                      <Text color={"white"} fontWeight={600}>
                        {item}
                      </Text>
                    </Box>
                  </Link>
                </Pressable>
              ))}
            </Box>
          </View>
        </View>
      </Modal>
      <Box display={"flex"} flexDir={"column"} w={"100%"} bg={"black"}>
        {isRacksLoading ? (
          <Spinner color="emerald.500" size="lg" mt={10} />
        ) : (
          <>
            <ScrollView>
              <Box
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <FlatList
                  data={allRacksData?.data?.racks}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setSelectedRack(item);
                        setModalVisible(true);
                      }}
                    >
                      <RackCard
                        rackId={item?.rack_id}
                        rackName={item?.rack_name}
                        cellsArr={item?.cells?.split(",")}
                      />
                    </Pressable>
                  )}
                  keyExtractor={item => `${item?.rack_id}-${item?.rack_name}`}
                />
              </Box>
            </ScrollView>
          </>
        )}
      </Box>
    </>
  );
}
