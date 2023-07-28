import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Box, Button, Input, Select, Text } from "native-base";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Card from "../components/Crad";
import { useGetProdCells } from "../hooks/api/useGetProdCells";
import { useProductSearch } from "../hooks/api/useProductSearch";

const Search = () => {
  const [prodName, setProdName] = useState("");
  const [prodId, setProdId] = useState(1);
  const [prodType, setProdType] = useState("");
  const [prodStyle, setProdStyle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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
  let params = {
    name: prodName,
    type: prodType,
  };
  const {
    isLoading: isSearchLoading,
    data: searchedData,
    refetch: refetchSearch,
  } = useProductSearch(params);
  console.log(searchedData);
  const {
    isLoading: isFindCellsLoading,
    data: cellsData,
    refetch: refetchCells,
  } = useGetProdCells(prodId);
  console.log("cell", cellsData?.data?.availableIn);
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
                Available In -
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
              {cellsData?.data?.availableIn?.map(item => (
                <Pressable>
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
                    key={item}
                  >
                    <Text color={"white"} fontWeight={600}>
                      Cell {item}
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </Box>
          </View>
        </View>
      </Modal>
      <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
        <Box display={"flex"} flexDir={"row"} flexWrap={"wrap"}>
          <Select
            selectedValue={prodType}
            minWidth="200"
            color={"white"}
            accessibilityLabel="Choose Product Type"
            placeholder="Choose Product Type"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <FontAwesome name="arrow-circle-o-down" size={15} />,
            }}
            mt={1}
            onValueChange={val => {
              setProdType(val);
            }}
          >
            <Select.Item label="Yarn" value="Yarn" />
            <Select.Item label="Thread" value="Thread" />
            <Select.Item label="Dyes" value="Dyes" />
            <Select.Item label="Fabric" value="Fabric" />
            <Select.Item label="Accessories" value="Accessories" />
            <Select.Item label="Needle" value="Needle" />
            <Select.Item label="Others" value="Others" />
          </Select>
        </Box>
        <Input
          mx="3"
          placeholder="Product name"
          minWidth="200"
          mt={5}
          color={"white"}
          py={2}
          onChangeText={text => {
            setProdName(text);
            if (prodType !== "" && prodName !== "") {
              refetchSearch();
            }
          }}
        />
        <Box display={"flex"} flexDir={"column"} alignItems={"center"} mt={5}>
          <Pressable>
            <Button
              colorScheme="success"
              // isLoading={isSearchLoading}
              onPress={() => {
                if (prodType !== "" && prodName !== "") {
                  refetchSearch();
                }
              }}
              leftIcon={
                <FontAwesome name="search" size={20} color={"#f3f4f6"} />
              }
            >
              Search
            </Button>
          </Pressable>
        </Box>
        <Box display={"flex"} flexDir={"column"}>
          <Text color={"white"} fontWeight={600} fontSize={18} mt={5} ml={4}>
            🔍 Search Results -{" "}
          </Text>

          <>
            <SafeAreaView>
              <Box
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <FlatList
                  data={searchedData?.data?.products}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setProdId(item?.product_id);
                        refetchCells();
                        // setSelectedProduct(item);
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
                  keyExtractor={item => `${item?.product_id}-${item?.name}`}
                />
              </Box>
            </SafeAreaView>
          </>
        </Box>
      </Box>
    </>
  );
};

export default Search;
